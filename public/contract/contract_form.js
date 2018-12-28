$(document).ready(function () {
  ipc.send('society_list');
  ipc.send('client_list');
});

$('#select-society').on('change', function () {
  ipc.send('building_list', $('select[name="society"]:selected').val())
});

$('#select-building').on('change', function () {
  ipc.send('apartment_list', $('select[name="building"]:selected').val())
});

ipc.on('society_list_reply', function (event, data) {
  let html = "<option value=\"\">Choisie une Societe</option>";
  data.forEach(function (item) {
    html += '<option value=\"' + item['id'] + '\">' + item['name'] + '</option>'
  });
  $('#select-society').html(html)
});

ipc.on('building_list_reply', function (event, data) {
  let html = "<option value=\"\">Choisie un Immeuble</option>";
  data.forEach(function (item) {
    html += '<option value=\"' + item['id'] + '\">' + item['name'] + '</option>'
  });
  $('#select-building').html(html)
});

ipc.on('apartment_list_reply', function (event, data) {
  let html = "<option value=\"\">Choisie une Appartement</option>";
  data.forEach(function (item) {
    html += '<option value=\"' + item['id'] + '\">' + item['number'] + " etage " + item['floor'] + '</option>'
  });
  $('#select-apartment').html(html)
});

ipc.on('client_list_reply', function (event, data){
  let html = "<option value=''>Choisie un Client</option>";
  data.forEach(function (item) {
    html += '<option value="' + item['id'] + '">' + item['firstname'] + ' ' + item['lastname'] + '</option>'
  });
  $("#select-client").html(html)
});