$(document).ready(function () {
  ipc.send('building_list', 1, global_id);
  global_id = null
});

ipc.on('building_list_reply', (event, data) => {
  let html = "";
  if (data.building_list) {
    data.building_list.forEach(function (item) {
      html += "<tr>" +
        "<td><input type='checkbox' name='building[]'></td>" +
        "<td>" + item['name'] + "</td>" +
        "<td class='cut-text'>" + item['address'] + "</td>" +
        "<td class='text-center'>" + item['postcode'] + "</td>" +
        "<td class='text-center'>" + item['city'] + "</td>" +
        "<td class='text-center'>" + item['nb_apartment'] + "</td>" +
        "<td class='text-center'>" + item['nb_client'] + "</td>" +
        "<td><span class='fas fa-eye' onclick='goto_info(" + item['id'] + ")'></span></td>" +
        "</tr>"
    });
    $('#content').html(html);
  }
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

function getData() {
  let page = $("a.current").val();
  ipc.send('building_list', page, global_id);

}

function goto_info(id) {

}