$(document).ready(function () {
    ipc.send('society_info', global_id)
});

ipc.on('society_info_reply', (event, data) => {
    console.log(data);
    let html = "<h1>" + data['name'] + "</h1>" +
        "<p>" + data['address'] + "</p>" +
        "<p>" + data['headquarters'] + "</p>";
    $('.jumbotron').html(html)
});