$(document).ready(function () {
  ipc.send("contract_list");
});

ipc.on("contract_list_reply", (event, data) => {
  var html = "";
  data.forEach(function (item) {
    html += "<tr>" +
      '<td><input type="checkbox" name="contract" value="' + item['id'] + '"></td>' +
      '<td scope="col">' + item['nSociety'] + '</td>' +
      '<td scope="col">' + item['nBuilding'] + '</td>' +
      '<td scope="col">' + item['nApartment'] + '</td>' +
      '<td scope="col">' + item['nClient'] + '</td>' +
      '<td scope="col">' + item['date_begin'] + '</td>' +
      '<td scope="col">' + item['date_end'] + '</td>' +
      '<td class="fas fa-eye"></td>' +
      '</tr>'
  });
  $('#content').html(html)
});