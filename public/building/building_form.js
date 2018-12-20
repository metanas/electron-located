$(document).ready(function () {
  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/society_list'
  }).then(function (response) {
    html = "";
    response.forEach(function (item) {
      html += '<option value="' + item['id'] + '">' + item['name'] + '</option>'
    });
    $('select[name="society_id"]').html(html)
  });
});

$('#add-button').on('click', function () {
  $.ajax({
    url: "http://localhost:3000/building_form?name=" + $('input[name="name"]').val() + "&address=" + $('input[name="address"]').val() + "&nb_floor=" + $('input[name="nb_floor"]').val() + "&city=" + $('input[name="city"]').val() + "&postcode=" + $('input[name="postcode"]').val() + "&telephone=" + $('input[name="telephone"]').val() + "&society_id=" + $('select[name="society_id"]').val(),
    method: "GET"
  }).then(function (response) {

  })
});