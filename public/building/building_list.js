$(document).ready(function () {
  console.log("localhost:3000/building_list?id=" + document.location.search.split("=")[1]);
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/building_list?id=" + document.location.search.split("=")[1]
  }).then(function (response) {
    console.log(response);
    var html = "";
    response.forEach(function (item) {
      html += "<div class=\"col-md-4\" style='margin-top: 15px'>" +
        "  <div class=\"card\" style=\"width: 100%;\">" +
        "    <img class=\"card-img-top\" src=\"https://upload.wikimedia.org/wikipedia/commons/1/1f/SGP_LOGO_CMJN_130416.png\"\n" +
        "         alt=\"Card image\">" +
        "    <div class=\"card-body\">" +
        "      <h4 class=\"card-title\">" + item['name'] + "</h4>" +
        "      <p class=\"card-text\">" + item['address'] + "</p>" +
        '      <a href=\"../building/building_list.html" class=\"btn btn-primary\">See Profile</a>' +
        "    </div>" +
        "  </div>" +
        "</div>"
    });
    $('#content').prepend(html)
  })
});
