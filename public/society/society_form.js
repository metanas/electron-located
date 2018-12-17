$('#add-button').on('click', function () {
  var url = '?name=' + $('input[name="name"]').val();
  url += '&headquateres=' + $('input[name="headquateres"]').val();
  url += '&telephone=' + $('input[name="telephone"]').val();

  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/society_form' + url
  }).then(function (response) {
    window.location.href = "society_list.html"

  })
});