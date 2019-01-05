$(document).ready(function () {
  ipc.send('society_list', 1);
});

ipc.on('society_list_reply', (event, data) => {
  if (data) {
    let html = "";
    data.society_list.forEach(function (item) {
      html += "<tr>" +
        "<td><input type='checkbox' name='society[]'></td>" +
        "<td>" + item['name'] + "</td>" +
        "<td class='cut-text'>" + item['address'] + "</td>" +
        "<td>" + item['headquarters'] + "</td>" +
        "<td>" + item['telephone'] + "</td>" +
        "<td>" + item['nb_building'] + "</td>" +
        "<td>" + item['rev_total'] + "</td>" +
        "<td>" + item['rev_refund'] + "</td>" +
        "<td><span class='fas fa-eye' onclick='goto_info(" + item['id'] + ")'></span></td>" +
        "</tr>"
    });

    $('#content').html(html);
    let total = (data.total_item.total / 20);
    if (total > 1) {
      Pagination.Init(document.getElementById('pagination'), {
        size: total, // pages size
        page: $('a.current').val(),  // selected page
        step: 3   // pages before and after current
      });
    }
  }
});

function goto(id) {
  global_id = id;
  myLoad('../building/building_list.html')
}

function goto_info(id) {
  global_id = id;
  myLoad('../society/society_info.html')
}

function getData() {
  let page = $('a.current').val();
  ipc.send('society_list', page)

}