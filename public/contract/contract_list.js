$(document).ready(function () {
  ipc.send("contract_list");
});

ipc.on("contract_list_reply", (event, data) => {
  $('input[name="all"]').attr('checked', false);
  var html = "";
  data.forEach(function (item) {
    html += "<tr>" +
      '<td><input type="checkbox" name="contract[]" value="' + item['id'] + '"></td>' +
      '<td scope="col">' + item['nSociety'] + '</td>' +
      '<td scope="col">' + item['nBuilding'] + '</td>' +
      '<td scope="col">' + item['nApartment'] + '</td>' +
      '<td scope="col">' + item['firstname'] + " " + item['lastname'] + '</td>' +
      '<td scope="col">' + item['date_begin'] + '</td>' +
      '<td scope="col">' + item['date_end'] + '</td>' +
      '<td class="fas fa-eye"></td>' +
      '</tr>'
  });
  $('#content').html(html)
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