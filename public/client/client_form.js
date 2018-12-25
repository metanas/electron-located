$('#add-button').on('click', function () {
  var data = {
    firstname: $('input[name="firstname"]').val(),
    lastname: $('input[name="lastname"]').val(),
    cin: $('input[name="cin"]').val(),
    gender: $('input[name="gender"]:checked').val()
  };
  ipc.send('client_form', data);
});