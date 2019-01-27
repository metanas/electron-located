$(document).ready(function () {
  ipc.send('apartment_info', global_id);
  ipc.send('client_list');
});

ipc.on("apartment_info_reply", function (event, data) {
  $("#input-price").val(data.apartment['location_price']);
  $("#input-apartment").val(data.apartment.type + " N " + data.apartment.number + " Etage" + data.apartment.floor);
});

ipc.on('client_list_reply', function (event, data) {
  let html = "<option value=''>Choisie un Client</option>";
  data.client_list.forEach(function (item) {
    html += '<option value="' + item.info['id'] + '">' + item.info['name'] + '</option>'
  });
  $("#select-client").html(html)
});

$(function () {
  $('#datetimepickerbegin').datetimepicker({
    viewMode: 'years',
    format: 'MM/YYYY',
  });

  $('#datetimepickerend').datetimepicker({
    viewMode: 'years',
    format: 'MM/YYYY',
  });

});

$('#add-button').on('click', function () {
  const data = {
    apartment: $('#select-apartment').val(),
    client: $('#select-client').val(),
    price: $('#input-price').val(),
    advanced_price: $('#input-advanced-price').val(),
    tax: $('#input-tax').val(),
    dateBegin: $('#input-date-begin').val(),
    dateEnd: $('#input-date-end').val()
  };
  ipc.send('contract_form', data);
});

ipc.on("contract_form_reply", function (event) {
  myLoad("../contract/contract_list.html");
});