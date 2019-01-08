$(document).ready(function () {
  ipc.send('apartment_list', 1, global_id);
  global_id = null;
});

ipc.on('apartment_list_reply', (event, data) => {
  var html = "";
  data.apartment_list.forEach(function (item) {
    html += "<tr>" +
      "<td><input type='checkbox' name='apartment[]'></td>" +
      "<td class='text-center'>" + item['number'] + "</td>" +
      "<td class='text-center'>" + item['floor'] + "</td>" +
      "<td class='cut-text'>" + item['address'] + "..</td>" +
      "<td class='text-center'>" + item['area'] + " m<sup>2</sup></td>" +
      "<td class='text-center'>" + item['type'] + "</td>" +
      "<td class='text-center'>" + item['state'] + "</td>" +
      "<td class='text-center'>" + item['location_price'] + " DHS</td>";
    if (item['client'] !== null)
      html += "<td class='text-center'>" + item['client'] + "</td>";
    else
      html += "<td class='text-center'>-</td>";

    html += "<td><span class='fas fa-eye' onclick='goto_info(" + item['id'] + ")'></span></td>" +
      "</tr>"
  });

  $('#content').html(html);

  let total = (data.total_item.total / 20);
  if (total > 1) {
    let page = 1;
    if($('a.current').val())
      page = $('a.current').val();
    Pagination.Init(document.getElementById('pagination'), {
      size: total, // pages size
      page: page,  // selected page
      step: 3   // pages before and after current
    });
  }

});

function goto(id) {
  global_id = id;
  myLoad('../apartment/apartment_list.html')
}

function goto_info(id) {

}

function getData() {
  let page = $("a.current").val();
  ipc.send('apartment_list', page, global_id);
}