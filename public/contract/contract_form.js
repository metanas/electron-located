$(document).ready(function () {
  ipc.send('society_list');
  ipc.send('client_list');
});

$('#select-society').on('change', function () {
  ipc.send('building_list', null, $('select[name="society"]:selected').val())
});

$('#select-building').on('change', function () {
  ipc.send('apartment_list', null, $('select[name="building"]:selected').val())
});
$('#select-apartment').on('change', function () {
  ipc.send('apartment_info', $('#select-apartment').val())
});

ipc.on("apartment_info_reply", function (event, data) {
  $("#input-price").val(data['location_price']);
});

ipc.on('society_list_reply', function (event, data) {
  let html = "<option value=\"\">Choisie une Societe</option>";
  data.society_list.forEach(function (item) {
    html += '<option value=\"' + item['id'] + '\">' + item['name'] + '</option>'
  });
  $('#select-society').html(html)
});

ipc.on('building_list_reply', function (event, data) {
  let html = "<option value=\"\">Choisie un Immeuble</option>";
  data.building_list.forEach(function (item) {
    html += '<option value=\"' + item['id'] + '\">' + item['name'] + '</option>'
  });
  $('#select-building').html(html)
});

ipc.on('apartment_list_reply', function (event, data) {
  let html = "<option value=\"\">Choisie une Appartement</option>";
  data.apartment_list.forEach(function (item) {
    html += '<option value=\"' + item['id'] + '\">' + item['number'] + " etage " + item['floor'] + '</option>'
  });
  $('#select-apartment').html(html)
});

ipc.on('client_list_reply', function (event, data) {
  let html = "<option value=''>Choisie un Client</option>";
  data.client_list.forEach(function (item) {
    html += '<option value="' + item['id'] + '">' + item['name'] + '</option>'
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
  var data = {
    apartment: $('#select-apartment').val(),
    client: $('#select-client').val(),
    price: $('#select-client').val(),
    advanced_price: $('#select-client').val(),
    tax: $('#select-client').val(),
    dateBegin: $('#input-date-begin').val(),
    dateEnd: $('#input-date-end').val()
  };
  ipc.send('contract_form', data);
});