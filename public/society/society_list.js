// const ipc = require('electron').ipcRenderer;
// $('#add').on('click', function (event) {
//   ipc.send('print-to-pdf')
// });
//
// ipc.on('wrote-pdf',function (event, path) {
//   const message = `Wrote PDF to: ${path}`;
//   console.log(message);
// })


$(document).ready(function () {
  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/society_list'
  }).then(function (response) {
    var html = "";
    response.forEach(function (item) {
      html += "<div class=\"col-md-4\" style='margin-top: 15px'>" +
        "  <div class=\"card\" style=\"width: 100%;\">" +
        "    <img class=\"card-img-top\" src=\"https://upload.wikimedia.org/wikipedia/commons/1/1f/SGP_LOGO_CMJN_130416.png\"\n" +
        "         alt=\"Card image\">" +
        "    <div class=\"card-body\">" +
        "      <h4 class=\"card-title\">" + item['name'] + "</h4>" +
        "      <p class=\"card-text\">" + item['headquarters'] + "</p>" +
        '      <a href="#" class=\"btn btn-primary\" onclick="$(\'#page-content-wrapper\').load(\'../building/building_list.html\', \'id=' + item['id'] + '\')">See Profile</a>' +
        "    </div>" +
        "  </div>" +
        "</div>"
    });
    $('#content').prepend(html)
  })
});
