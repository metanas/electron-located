$(document).ready(function () {
  ipc.send('payment_list', 1);
});

ipc.on('payment_list_reply', (event, data) => {
  if (data.payment_list.length > 0) {
    let html = "";
    data.payment_list.forEach(function (item) {
      html += "<tr>" +
        "<td><input type='checkbox' name='payment[]'></td>" +
        "<td>" + item['type'] + " N<sup>o</sup> " + item['number'] + " Etage " + item['floor'] + "</td>" +
        "<td class='cut-text'>" + item['address'] + "</td>" +
        "<td class='text-center'>" + item['city'] + "</td>" +
        "<td class='text-center'>" + item['name'] + "</td>" +
        "<td class='text-center'>" + item['price'] + " DHS</td>" +
        "<td class='text-center'>" + item['price_paid'] + " DHS</td>" +
        "<td class='text-center'>" + item['date'] + "</td>" +
        "<td><span class='fas fa-eye' onclick='goto_info(" + item['id_contract'] + ", "+ item['date'] + " )'></span></td>" +
      "</tr>"
    });

    $('#content').html(html);
    let total = (data.total_item.total / 20);
    if (total > 1) {
      let page = 1;
      if ($('a.current').val())
        page = $('a.current').val();
      Pagination.Init(document.getElementById('pagination'), {
        size: total, // pages size
        page: page,  // selected page
        step: 3   // pages before and after current
      });
    }
  }
});

function goto(id) {
  global_id = id;
  myLoad('../building/building_list.html')
}

function goto_info(id, date) {
  global_id = id;
  myLoad('../payment/payment_info.html')
}

function getData() {
  let page = $('a.current').val();
  ipc.send('society_list', page)

}