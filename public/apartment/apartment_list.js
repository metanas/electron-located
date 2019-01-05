$(document).ready(function () {
    ipc.send('apartment_list', 1, global_id);
    global_id = null;
});

ipc.on('apartment_list_reply', (event, data) => {
    var html = "";
    data.apartment_list.forEach(function (item) {
        html += "<div class=\"col-md-4\" style='margin-top: 15px'>" +
            "  <div class=\"card\" style=\"width: 100%;\">" +
            "    <img class=\"card-img-top\" src=\"https://freshome.com/wp-content/uploads/2018/02/studio-intro.jpg\"\n" +
            "         alt=\"Card image\">" +
            "    <div class=\"card-body\">" +
            "      <h4 class=\"card-title\">" + item['number'] + "</h4>" +
            "      <p class=\"card-text\">" + item['description'] + "</p>" +
            '      <a href="#" onclick="goto(id)" class=\"btn btn-primary\">See Profile</a>';
        if (item['status'] === 1)
            html += '<a href="#" class="fas fa-user float-right"></a>';
        html += "</div>" +
            "  </div>" +
            "</div>"
    });
    $('#content').html(html);

    let total = (data.total_item.total / 20);
    if (total > 1) {
        Pagination.Init(document.getElementById('pagination'), {
            size: total, // pages size
            page: 1,  // selected page
            step: 3   // pages before and after current
        });
    }

});

function goto(id) {
    global_id = id;
    myLoad('../apartment/apartment_list.html')
}

function getData() {
    let page = $("a.current").val()
}