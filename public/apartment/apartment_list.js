$(document).ready(function () {
  ipc.send('apartment_list', global_id);
  global_id = null;
});

ipc.on('apartment_list_reply', (event, data) => {
  var html = "";
  data.forEach(function (item) {
    html += "<div class=\"col-md-4\" style='margin-top: 15px'>" +
      "  <div class=\"card\" style=\"width: 100%;\">" +
      "    <img class=\"card-img-top\" src=\"https://upload.wikimedia.org/wikipedia/commons/1/1f/SGP_LOGO_CMJN_130416.png\"\n" +
      "         alt=\"Card image\">" +
      "    <div class=\"card-body\">" +
      "      <h4 class=\"card-title\">" + item['number'] + "</h4>" +
      "      <p class=\"card-text\">" + item['description'] + "</p>" +
      '      <a href="#" onclick="goto(id)" class=\"btn btn-primary\">See Profile</a>';
    if (item['status'] === 1)
      html += '<a href="#" class="fas fa-user float-right"></a>';
    html += "</div>" +
      "  </div>" +
      "</div>"
  });
  $('#content').html(html)
});

function goto(id) {
  global_id = id;
  myLoad('../apartment/apartment_list.html')
}
