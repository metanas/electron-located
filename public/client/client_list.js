$(document).ready(function () {
  ipc.send('client_list')
});

ipc.on('client_list_reply', (event, data) => {
  let html = ""
  data.forEach((item) => {
    html += "<div class=\"col-md-4\" style='margin-top: 15px'>" +
      "  <div class=\"card\" style=\"width: 100%;\">" +
      "    <img class=\"card-img-top\" src=\"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png\"\n" +
      "         alt=\"Card image\">" +
      "    <div class=\"card-body\">" +
      "      <h4 class=\"card-title\">" + item['name'] + "</h4>" +
      "      <p class=\"card-text\">" + item['cin'] + "</p>" +
      '      <a href="#" class="btn btn-primary" onclick="goto(' + item['id'] + ')">See Profile</a>' +
      "    </div>" +
      "  </div>" +
      "</div>"
  });
  $('#content').html(html);
})