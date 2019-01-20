$(document).ready(function () {
  ipc.send("payment_info", global_id)
});

ipc.on("payment_info_reply", function (event, item) {
  $("input[name='price']").val(item.payment['price']);
  let html = "<div class=\"col-md-12 col-sm-12\">";

  html += "      <div class=\"row\" style=\"border-bottom: 1px dashed;padding: 4px\">";
  html += "      <div class=\"col-md-3\" style=\"border-right: 1px dashed;line-height: 0.4; font-size: 14px\">" +
    "<h6 class='text-uppercase text-center'><b>" + item.society['name'] + "</b></h6>" +
    "<h6 class='text-center'></h6>" +
    "<h6 class='text-center'>" + item.society['address'] + "</h6>" +

    "<div>" +
    "<p> Propriete:</p><p style='padding-left: 4px' class='text-uppercase'>" + item.society['name'] + "</p>" +
    "<p> Recu de:</p><p style='padding-left: 4px' class='text-uppercase'>" + item.client['name'] + "</p>" +
    "<p> La somme de:</p><p style='padding-left: 4px'>" + parseFloat(item.payment['price']) + " DHS</p>" +
    "<p> Pour le loyer de:</p><p style='padding-left: 4px'>" + item.apartment['type'] + " N° " + item.apartment['number'] + " étage " + item.apartment['floor'] + "</p>" +
    "<p> Qu'il occupe a:</p><p style='padding-left: 4px'>" + item.apartment['address'] + "</p>" +
    "<p> Mois " + item.payment['date'] + "</p>" +
    "</div>" +
    "</div>";

  html += "<div class='col-md-9'><h2 class=\"w-100 text-uppercase\" >" + item.society['name'] + "</h2>" +
    "        <div class=\"w-100\">" + item.society['headquarters'] + "</div>" +
    "        <div class=\"w-100\">" + item.society['address'] + "</div>" +
    "<hr class='w-100' style='margin-bottom: 0;margin-top: 0'>" +
    "        <table class=\"w-100\">" +
    "          <tr>" +
    "            <td class=\"w-25\">Loyer:</td>" +
    "            <td>" + parseFloat(item.apartment['location_price']) + " DHS</td>" +
    "          </tr>" +
    "          <tr>" +
    "            <td class=\"w-25\">Tax:</td>" +
    "            <td>" + parseFloat(item.contract['tax']) + " DHS</td>" +
    "          </tr>" +
    "          <tr>" +
    "            <td class=\"w-25\">Total:</td>" +
    "            <td>" + (parseFloat(item.apartment['location_price']) + parseFloat(item.contract['tax'])) + " DHS</td>" +
    "          </tr>" +
    "        </table>" +
    "<hr class='w-100' style='margin-bottom: 0;margin-top: 0'>" +
    "        <table class='w-100'>" +
    "          <tr>" +
    "            <td class='w-25'>Reçu de:</td>" +
    "            <td class='w-25 text-capitalize'>" + item.client['name'] + "</td>" +
    "            <td class='text-right w-50'>Administrateur</td>" +
    "          </tr>" +
    "          <tr>" +
    "            <td>Pour le loyer de:</td>" +
    "            <td>" + item.apartment['type'] + " N° " + item.apartment['number'] + " étage " + item.apartment['floor'] + "</td>" +
    "            <td></td>" +
    "          </tr>" +
    "          <tr>" +
    "            <td>Qui est occupé a:</td>" +
    "            <td>" + item.apartment['address'] + "</td>" +
    "            <td></td>" +
    "          </tr>" +
    "          <tr>" +
    "            <td>Mois:</td>" +
    "            <td>" + item.payment['date'] + "</td>" +
    "            <td></td>" +
    "          </tr>" +
    "        </table>" +
    "      </div>" +
    "</div>" +
    "</div>";
  $('#content').html(html);

  $("#send-update").on("click", function () {
    data = {
      price: $("input[name='price']").val(),
      id: item.payment['id']
    };
    event.sender.send("payment_put", data);
  });

  $("#download-button").on("click", function () {
      ipc.send("print-to-pdf", [item.payment['id']]);
  });

  ipc.on("payment_put_reply", function (event) {
    $(".modal-backdrop.fade.show").remove();
    $("body").removeClass("modal-open");
    myLoad("../payment/payment_list.html")
  })
});