$(document).ready(
  ipc.send('society_list')
);


ipc.on('society_list_reply', (event, data) => {
  var html = "<option value=''>Selectionner une Société..</option>";
  data.forEach(function (item) {
    html += '<option value="' + item['id'] + '">' + item['name'] + '</option>'
  });
  $('#society_list').html(html)
});

ipc.on('building_list_reply', (event, data) => {
  var html = "";
  data.forEach(function (item) {
    html += '<option value="' + item['id'] + '">' + item['name'] + '</option>';
  });
  $('#building_list').html(html)
});

$('#society_list').change(function () {
  ipc.send('building_list', $('select[name="id_society"]').val())
});

$('#add-button').on('click', function () {
  var data = {
    number: $('input[name="number"]').val(),
    floor: $('input[name="floor"]').val(),
    area: $('input[name="area"]').val(),
    nb_bed: $('input[name="nb_bed"]').val(),
    description: $('textarea[name="description"]').val(),
    location_price: $('input[name="location_price"]').val(),
    advance_price: $('input[name="advance_price"]').val(),
    tax: $('input[name="tax"]').val(),
    other_charge: $('input[name="other_charge"]').val(),
    id_building: $('select[name="id_building"]').val(),
  };
  ipc.send('apartment_form', data);
});