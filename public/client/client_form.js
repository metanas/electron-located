$('#add-button').on('click', function () {
  var data = {
    firstname: $('input[name="firstname"]').val(),
    lastname: $('input[name="lastname"]').val(),
    cin: $('input[name="cin"]').val(),
    gender: $('input[name="gender"]:checked').val()
  };

  $.ajax({
    url: "http://localhost:3000/client",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(data),
    dataType: 'json'
  }).then(function (response) {

  })
})