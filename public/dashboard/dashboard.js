$(document).ready(function () {
  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/dashboard'
  }).then(function (response) {
    console.log(response);
  })
});