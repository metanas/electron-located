$(document).ready(function () {
  ipc.send('apartment_list', 1, global_id);
  global_id = null;
});

ipc.on('apartment_list_reply', (event, data) => {
  console.log(data);
  let html = " <td colspan=\"10\" align=\"center\">Il y a aucune Appartement!</td>\n";
  if (data.apartment_list.length > 0) {
    html = "";
    data.apartment_list.forEach(function (item) {
      html += "<tr>" +
        "<td><input type='checkbox' name='item[]' value='" + item['id'] + "'></td>" +
        "<td class='text-center'>" + item['type'] + "</td>" +
        "<td class='text-center'>" + item['number'] + "</td>" +
        "<td class='cut-text'>" + item['address'] + "..</td>" +
        "<td class='text-center'>" + item['floor'] + "</td>" +
        "<td class='text-center'>" + item['area'] + " m<sup>2</sup></td>" +
        "<td class='text-center'>" + item['state'] + "</td>" +
        "<td class='text-center'>" + item['location_price'] + " DHS</td>";
      if (item['client'] !== null)
        html += "<td class='text-center'>" + item['client'] + "</td>";
      else
        html += "<td class='text-center'>-</td>";

      html += "<td><span class='fas fa-eye' onclick='goto_info(" + item['id'] + ")'></span></td>" +
        "</tr>"
    });
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
  ipc.send('apartment_delete', id);
});

ipc.on("apartment_delete_reply", (event, data) => {
  event.sender.send('apartment_list', 1, global_id);
});