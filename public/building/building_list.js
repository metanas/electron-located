$(document).ready(function () {
  ipc.send('building_list', global_id);
  global_id = null
});

ipc.on('building_list_reply', (event, data) => {
  let html = "";
  data.forEach(function (item) {
    html += "<div class=\"col-md-4\" style='margin-top: 15px'>" +
      "  <div class=\"card\" style=\"width: 100%;\">" +
      "    <img class=\"card-img-top\" src=\"http://www.eatlogos.com/building_logos/png/editable-building-logo-design.png\"\n" +
      "         alt=\"Card image\">" +
      "    <div class=\"card-body\">" +
      "      <h4 class=\"card-title\">" + item['name'] + "</h4>" +
      "      <p class=\"card-text\">" + item['address'] + "</p>" +
      '      <a href="#" class="btn btn-primary" onclick="goto(' + item['id'] + ')">See Profile</a>' +
      "    </div>" +
      "  </div>" +
      "</div>"
  });
  $('#content').html(html)
});


function goto(id) {
  global_id = id;
  myLoad('../apartment/apartment_list.html')
}