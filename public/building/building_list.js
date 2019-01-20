$(document).ready(function () {
  ipc.send('building_list', 1, global_id);
  global_id = null
});

ipc.on('building_list_reply', (event, data) => {
  let html = "";
  if (data.building_list.length > 0) {
    data.building_list.forEach(function (item) {
      html += "<tr>" +
        "<td><input type='checkbox' name='item[]' value='" + item.info['id'] + "'> </td>" +
        "<td>" + item.info['name'] + "</td>" +
        "<td class='cut-text'>" + item.info['address'] + "</td>" +
        "<td class='text-center'>" + item.info['postcode'] + "</td>" +
        "<td class='text-center'>" + item.info['city'] + "</td>" +
        "<td class='text-center'>" + item.totalApartments['total'] + "</td>" +
        "<td class='text-center'>" + item.totalClients['total'] + "</td>" +
        "<td><span class='fas fa-eye' style='cursor: pointer' onclick='goto_info(" + item.info['id'] + ")'></span></td>" +
        "</tr>"
    });
  } else {
    html = "<td colspan=\"7\" align=\"center\">Il y a aucune Immeuble!</td>"
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

function getData() {
  let page = $("a.current").val();
  ipc.send('building_list', page, global_id);

}

function goto_info(id) {
  alert("not implemented")
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
  ipc.send('building_delete', id);
});

ipc.on("building_delete_reply", function (event) {
  console.log('re');
  event.sender.send('building_list', 1, null);
});