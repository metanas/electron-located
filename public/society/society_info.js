$(document).ready(function () {
    ipc.send('society_info', global_id);
    global_id=null
});

ipc.on('society_info_reply', (event, data) => {
    let html = "<div class='row'><div class='col-3'>" +
      "<img src='../../assert/" + data['image'] + "' class='img-fluid'> </div>"
        + "<div class='col-8'><h1>" + data['name'] + "</h1>" +
        "<p>" + data['headquarters'] + "</p>" +
        "<p>" + data['address'] + "</p>" +
        "<p>Tel: " + data['telephone'] + "</p></div></div>";
    $('.jumbotron').html(html);

    $('#building-count').html(data['nb_building']);
    $('#apartment-count').html(data['apart_count']);
    $('#client-count').html(data['apart_taken']);
    $('#total-price').html(data['total_price'] + " DHS");
    $('#total-price-paid').html(data['total_price_paid'] + " DHS");
});