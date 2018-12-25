$(document).ready(function () {
  ipc.send('society_list');
});

ipc.on('society_list_reply', (event, data) => {
  html = "";
  data.forEach(function (item) {
    html += '<option value="' + item['id'] + '">' + item['name'] + '</option>'
  });
  $('select[name="society_id"]').html(html)
});

$('#add-button').on('click', function () {
  let data = {
    name: $('input[name="name"]').val(),
    address: $('input[name="address"]').val(),
    nb_floor: $('input[name="nb_floor"]').val(),
    city: $('input[name="city"]').val(),
    postcode: $('input[name="postcode"]').val(),
    telephone: $('input[name="telephone"]').val(),
    society_id: $('select[name="society_id"]').val()
  };

  ipc.send('building_form', data);
});