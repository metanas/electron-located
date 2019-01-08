$(document).ready(function () {
  ipc.send('client_list', 1)
});

ipc.on('client_list_reply', (event, data) => {
  let html = "";
  if (data.client_list) {
    data.client_list.forEach((item) => {
      html += "<tr>" +
        "<td><input type='checkbox' name='building[]'></td>" +
        "<td>" + item['name'] + "</td>" +
        "<td class='cut-text'>" + item['type'] + "</td>" +
        "<td class='text-center'>" + item['cin'] + "</td>" +
        "<td class='text-center'>" + item['address'] + "</td>" +
        "<td class='text-center'>" + item['telephone'] + "</td>" +
        "<td class='text-center'>-</td>" +
        "<td><span class='fas fa-eye' onclick='goto_info(" + item['id'] + ")'></span></td>" +
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
  }
});