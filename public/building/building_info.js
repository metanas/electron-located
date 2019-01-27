$(document).ready(function () {
  ipc.send("building_info", global_id);
  global_id = null;
});

ipc.on("building_info_reply", function (event, data) {
  $('#content').prepend("<div class='col-md-12'>societe: " + data.society.name + "</div>");
  $('#content').prepend("<div class='col-md-12'>adresse: " + data.building.address + "</div>");
  $('#content').prepend("<div class='col-md-12'>nombre apart: " + data.apartment_total.total + "</div>");
  $("h1").html(data.building.name);
  $("h1").data('id', data.building.id);
});

$("#add-button").on("click", function () {
  global_id = $('h1').data('id');
  myLoad('../apartment/apartment_form.html');
});