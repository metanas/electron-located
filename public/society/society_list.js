$(document).ready(function () {
  ipc.send('society_list', 1);
});

ipc.on('society_list_reply', (event, data) => {
  console.log("test");
  let html = "";
  if (data.society_list.length > 0) {
    data.society_list.forEach(function (item) {
      html += "<tr>" +
        "<td><input type='checkbox' name='item[]' value='" + item['id'] + "'></td>" +
        "<td>" + item['name'] + "</td>" +
        "<td class='cut-text'>" + item['address'] + "</td>" +
        "<td>" + item['headquarters'] + "</td>" +
        "<td>" + item['telephone'] + "</td>" +
        "<td class='text-center'>" + item['nb_buildings'] + "</td>" +
        "<td class='text-center'>" + item['total_price'] + " DHS</td>" +
        "<td class='text-center'>" + item['total_price_paid'] + " DHS</td>" +
        "<td><span class='fas fa-eye' style='cursor: pointer' onclick='goto_info(" + item['id'] + ")'></span></td>" +
        "</tr>"
    });
  } else {
    html = "<td colspan=\"9\" align=\"center\">Il y a aucune societe!</td>"
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

$('input[name="all"]').on('click', function (e) {
  if (e.target.checked) {
    $('input[name="item[]"]').attr('checked', true);
  } else {
    $('input[name="item[]"]').attr('checked', false);
  }
});

$('#delete-button').on('click', function () {
  let id = [];
  $.map($('input[name="item[]"]:checked'), function (item) {
    id.push($(item).val())
  });
  ipc.send('society_delete', id);
});

ipc.on("society_delete_reply", function (event) {
  event.sender.send('society_list', 1);
});