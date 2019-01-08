$(document).ready(function () {
  ipc.send("contract_list", 1);
});

ipc.on("contract_list_reply", (event, data) => {
  $('input[name="all"]').attr('checked', false);
  var html = "";
  data.contract_list.forEach(function (item) {
    html += "<tr>" +
      '<td><input type="checkbox" name="contract[]" value="' + item['id'] + '"></td>' +
      '<td scope="col">' + item['type'] + " N<sup>o</sup> " + item['number'] + " Etage " + item['floor'] + '</td>' +
      '<td scope="col">' + item['address'] + '</td>' +
      '<td scope="col">' + item['client'] + '</td>' +
      '<td scope="col">' + item['location_price'] + '</td>' +
      '<td scope="col">' + item['advanced_price'] + '</td>' +
      '<td scope="col">' + item['date_begin'] + '</td>' +
      '<td scope="col">' + item['date_end'] + '</td>' +
      '<td class="fas fa-eye"></td>' +
      '</tr>'
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

$('input[name="all"]').on('click', function (e) {
  if (e.target.checked) {
    $('input[name="contract[]"]').attr('checked', true);
  } else {
    $('input[name="contract[]"]').attr('checked', false);
  }
});

$('#delete-button').on('click', function () {
  var id = [];
  $.each($('input[name="contract[]"]:checked'), function () {
    id.push($(this).val())
  });
  ipc.send('contract_delete', id)
});

$('#download-button').on('click', function () {
  var id = [];
  $.each($('input[name="contract[]"]:checked'), function () {
    id.push($(this).val())
  });
  ipc.send('print-to-pdf', id)
});
// $('#add').on('click', function (event) {
//   ipc.send('print-to-pdf')
// });
//
// ipc.on('wrote-pdf',function (event, path) {
//   const message = `Wrote PDF to: ${path}`;
//   console.log(message);
// })