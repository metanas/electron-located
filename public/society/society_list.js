// $('#add').on('click', function (event) {
//   ipc.send('print-to-pdf')
// });
//
// ipc.on('wrote-pdf',function (event, path) {
//   const message = `Wrote PDF to: ${path}`;
//   console.log(message);
// })


$(document).ready(function () {
    ipc.send('society_list');
});

ipc.on('society_list_reply', (event, data) => {
    if (data) {
        html = "";
        data.forEach(function (item) {
            html += "<tr>" +
                "<td><input type='checkbox' name='society[]'></td>" +
                "<td>" + item['name'] + "</td>" +
                "<td>" + item['address'] + "</td>" +
                "<td>" + item['headquarters'] + "</td>" +
                "<td>" + item['telephone'] + "</td>" +
                "<td>" + item['nb_building'] + "</td>" +
                "<td>" + item['rev_total'] + "</td>" +
                "<td>" + item['rev_refund'] + "</td>" +
                "<td><span class='fas fa-eye' onclick='goto_info(" + item['id'] + ")'></span></td>" +
                "</tr>"
        });
        $('#content').html(html);
    }
});

function goto(id) {
    global_id = id;
    myLoad('../building/building_list.html')
}

function goto_info(id) {
    global_id = id;
    myLoad('../society/society_info.html')
}