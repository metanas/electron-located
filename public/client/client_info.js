$(document).ready(function () {
  ipc.send('client_info', global_id)
});

ipc.on('client_info_reply', (event, data) => {
  let html = "<div class='row'><div class='col-3'>" +
    "<img src='../../assert/client_placeholder.png' class='img-fluid'> </div>"
    + "<div class='col-8'><h1>" + data.info['name'] + "</h1>" +
    "<p>Type: " + data.info['type'] + "</p>" +
    "<p>" + data.info['identification'] + "</p>" +
    "<p>" + data.info['address'] + "</p>" +
    "<p>Tel: " + data.info['telephone'] + "</p></div></div>";
  $('.jumbotron').html(html);
console.log(data);
  $('#advance-price').html(data.unpaid);
  $('#total-price').html(data.info['total_price'] + " DHS");
  $('#total-price-paid').html(data.info['total_price_paid'] + " DHS");
});