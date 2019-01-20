$(document).ready(function () {
  ipc.send("contract_list", 1);
});

ipc.on("contract_list_reply", (event, data) => {
  $('input[name="all"]').attr('checked', false);
  let html = "";
  if (data.contract_list.length > 0) {
    data.contract_list.forEach(function (item) {
      html += "<tr>" +
        '<td><input type="checkbox" name="item[]" value="' + item['id'] + '"></td>' +
        '<td scope="col">' + item['type'] + " N<sup>o</sup> " + item['number'] + " Etage " + item['floor'] + '</td>' +
        '<td scope="col" class="cut-text">' + item['aBuilding'] + '</td>' +
        '<td scope="col">' + item['client'] + '</td>' +
        '<td scope="col">' + parseFloat(item['location_price']) + ' DHS</td>' +
        '<td scope="col">' + parseFloat(item['advanced_price']) + ' DHS</td>' +
        '<td scope="col">' + item['date_begin'] + '</td>' +
        '<td scope="col">' + item['date_end'] + '</td>' +
        '<td class="fas fa-eye" onclick="goto_info(' + item['id'] + ')"></td>' +
        '</tr>'
    });
  } else {
    html = "<td colspan=\"9\" align=\"center\">Il y a pas de contrat!</td>"
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
  let id = [];
  $.map($('input[name="item[]"]:checked'), function (item) {
    id.push($(item).val())
  });
  ipc.send('contract_delete', id);
});

ipc.on("contract_delete_reply", function (event) {
  event.sender.send("contract_list", 1);
});

function goto_info(id) {
  alert("not implemented")
}

// $('#download-button').on('click', function () {
//   var id = [];
//   $.each($('input[name="contract[]"]:checked'), function () {
//     id.push($(this).val())
//   });
//   ipc.send('print-to-pdf', id)
// });
// $('#add').on('click', function (event) {
//   ipc.send('print-to-pdf')
// });
//
// ipc.on('wrote-pdf',function (event, path) {
//   const message = `Wrote PDF to: ${path}`;
//   console.log(message);
// })