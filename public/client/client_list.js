$(document).ready(function () {
  ipc.send('client_list', 1)
});

ipc.on('client_list_reply', (event, data) => {
  let html = "";
  if (data.client_list) {
    data.client_list.forEach((item) => {
      html += "<tr>" +
        "<td><input type='checkbox' name='item[]' value='" + item['id'] + "'></td>" +
        "<td>" + item['name'] + "</td>" +
        "<td class='cut-text'>" + item['type'] + "</td>" +
        "<td class='text-center'>" + item['identification'] + "</td>" +
        "<td class='text-center'>" + item['address'] + "</td>" +
        "<td class='text-center'>" + item['telephone'] + "</td>" +
        "<td class='text-center'>-</td>" +
        "<td><span class='fas fa-eye' onclick='goto_info(" + item['id'] + ")'></span></td>" +
        "</tr>"
    });
  } else {
    html = "<td colspan=\"8\" align=\"center\">Il y a aucun Client!</td>"
  }

  $('#content').html(html);

  let total = (data.total_item.total / 20);
  if (total > 1) {
    let page = 1;
    if ($('a.current').val())
      page = $('a.current').val();
    Pagination.Init(document.getElementById('pagination'), {
      size: total, // pages size
      page: page,  // selected page
      step: 3   // pages before and after current
    });
  }
});

$('input[name="all"]').on('click', function (e) {
  if (e.target.checked) {
    $('input[name="item[]"]').attr('checked', true);
  } else {
    $('input[name="item[]"]').attr('checked', false);
  }
});

$('#delete-button').on('click', function () {
  var id = [];
  $.map($('input[name="item[]"]:checked'), function (item) {
    id.push($(item).val())
  });
  ipc.send('client_delete', id);
});

ipc.on("client_delete_reply", (event, data) => {
  event.sender.send('client_list', 1);
});