$(document).ready(function () {
  ipc.send('building_info', global_id);
  global_id = null;
});

ipc.on("building_info_reply", function (event, data) {
  $("input[name=\"id_building\"]").val(data.building.name);
  $("input[name=\"id_building\"]").data("val", data.building.id);
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
  const data = {
    image_path: images_path,
    image_name: images_name,
    number: $('input[name="number"]').val(),
    floor: $('input[name="floor"]').val(),
    area: $('input[name="area"]').val(),
    description: $('textarea[name="description"]').val(),
    location_price: $('input[name="location_price"]').val(),
    type: $('#select-type').val(),
    id_building: $("input[name=\"id_building\"]").data("val")
  };
  ipc.send('apartment_form', data);
});

ipc.on("apartment_form_reply", function (event) {
  myLoad("../apartment/apartment_list.html");
});