$(document).ready(function () {
  ipc.send("apartment_info", global_id);
  global_id = null;
});

ipc.on("apartment_info_reply", (event, data) => {
  $("h1").html(data.apartment['type'] + " N<sup>o</sup> " + data.apartment.number + " Etage: " + data.apartment.floor);
  $("h1").data('id', data.apartment.id);

  if (typeof data.client !== "undefined")
    $(".card-counter.info").prepend("<span class=\"count-numbers\">" + data['client'].name + "</span>\n" +
      "        <span class=\"count-name\">Client</span>");
  if (typeof data.payment !== "undefined")
    $(".card-counter.danger").prepend("<span class=\"count-numbers\">" + data['payment'].total + "</span>" +
      "<span class=\"count-name\">Facture non Paye</span>");
  if (typeof data.contract === "undefined")
    $(".add-button").remove();
  else {
    $('.start').html("<strong>date debut</strong> " + data.contract['date_begin']);
    let date = (data.contract['date_end']) ? data.contract['date_end'] : "-";
    $('.ends').html("<strong>date debut</strong> " + date);
    let stats = '<div><strong>Prix de location </strong>' + data.apartment.location_price + ' DHS</div>' +
      '<div><strong>Tax</strong>' + data.contract.tax + ' DHS</div>' +
      '<div><strong>L\'avance</strong>' + data.contract.advanced_price + ' DHS</div>';
    $('.stats').html(stats)
  }
});

$("#add-button").on("click", function () {
  global_id = $("h1").data('id');
  myLoad("../contract/contract_form.html");
});

$("#delete-button").on("click", function () {
  ipc.send("delete_apartment", global_id)
});