$('#add-button').on('click', function () {
  var data = {
    name: $('input[name="name"]').val(),
    headquateres: $('input[name="headquateres"]').val(),
    telephone: $('input[name="telephone"]').val(),
  };

  ipc.send('society_form', data);
});