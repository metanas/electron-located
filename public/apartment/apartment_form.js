$(document).ready(
  ipc.send('society_list')
);


ipc.on('society_list_reply', (event, data) => {
  var html = "<option value=''>Selectionner une Société..</option>";
  data.society_list.forEach(function (item) {
    html += '<option value="' + item['id'] + '">' + item['name'] + '</option>'
  });
  $('#society_list').html(html)
});

ipc.on('building_list_reply', (event, data) => {
  var html = "";
  data.building_list.forEach(function (item) {
    html += '<option value="' + item['id'] + '">' + item['name'] + '</option>';
  });
  $('#building_list').html(html)
});

$('#society_list').change(function () {
  ipc.send('building_list', null, $('select[name="id_society"]').val())
});

$('#add-button').on('click', function () {
  let images = $('input[name="images[]"]');
  let images_name = [];
  let images_path = [];
  $.map(images, function (image) {
    if (image.files.length > 0) {
      images_name.push(image.files[0].name);
      images_path.push(image.files[0].path);
    }
  });
  var data = {
    image_path: images_path,
    image_name: images_name,
    number: $('input[name="number"]').val(),
    floor: $('input[name="floor"]').val(),
    area: $('input[name="area"]').val(),
    description: $('textarea[name="description"]').val(),
    location_price: $('input[name="location_price"]').val(),
    type: $('select[name="type"]:selected').val(),
    id_building: $('select[name="id_building"]:selected').val(),
  };
  ipc.send('apartment_form', data);
});