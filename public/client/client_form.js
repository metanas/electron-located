$('#add-button').on('click', function () {
  var data = {
    type: $('input[name="type"]:checked').val(),
    name: $('input[name="name"]').val(),
    address: $('input[name="address"]').val(),
    telephone: $('input[name="telephone"]').val(),
    identification: $('input[name="identification"]').val(),
  };
  ipc.send('client_form', data);
});

