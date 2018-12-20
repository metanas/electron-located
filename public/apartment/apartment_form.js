$(document).ready(
  $.ajax({
    url: 'http://localhost:3000/society_list',
    method: "GET"
  }).then(function (response) {
    var html = "<option value=''>Selectionner une societe..</option>";
    response.forEach(function (item) {
      html += '<option value="' + item['id'] + '">' + item['name'] + '</option>'
    });
    $('#society_list').html(html)
  })
);

$('#society_list').change(function () {
  $.ajax({
    url: 'http://localhost:3000/building_list?id=' + $('select[name="id_society"]').val(),
    method: "GET"
  }).then(function (response) {
    var html = "";
    response.forEach(function (item) {
      html += '<option value="' + item['id'] + '">' + item['name'] + '</option>';
    });
    $('#building_list').html(html)
  })
})
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
  $.ajax({
    url: 'http://localhost:3000/apartment_form',
    contentType: "application/json",
    method: "POST",
    data: JSON.stringify(data),
    dataType: 'json'
  }).then(function (response) {

  })
});