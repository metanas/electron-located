$(document).ready(function () {
  ipc.send('payment_list', 1);
});

ipc.on('payment_list_reply', (event, data) => {
  if (data.payment_list.length > 0) {
    let html = "";
    if (data.payment_list.length > 0) {
      data.payment_list.forEach(function (item) {
        html += "<tr>" +
          "<td><input type='checkbox' name='item[]' value='" + item['id'] + "'></td>" +
          "<td>" + item['type'] + " N<sup>o</sup> " + item['number'] + " Etage " + item['floor'] + "</td>" +
          "<td class='cut-text'>" + item['name'] + "</td>" +
          "<td class='text-center'>" + item['client'] + "</td>" +
          "<td class='text-center'>" + item['price'] + " DHS</td>" +
          "<td class='text-center'>" + item['price_paid'] + " DHS</td>" +
          "<td class='text-center'>" + item['date'] + "</td>" +
          "<td><span class='fas fa-eye' style='cursor: pointer' onclick='goto_info(\"" + item['id'] + "\")'></span></td>" +
          "</tr>"
      });
    } else {
      html = "<td colspan=\"9\" align=\"center\">Il y a aucune Facture!</td>\n"
    }

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

function goto_info(id) {
  global_id = id;
  myLoad('../payment/payment_info.html')
}

function getData() {
  let page = $('a.current').val();
  ipc.send('society_list', page)

}

$('input[name="all"]').on('click', function (e) {
  if (e.target.checked) {
    all = "all";
    $('input[name="item[]"]').attr('checked', true);
  } else {
    all = "";
    $('input[name="item[]"]').attr('checked', false);
  }
});

$("#refresh-button").on("click", function () {
  ipc.send("payment_update");
});

ipc.on("payment_update_reply", (event) => {
  ipc.send('payment_list', 1);
});

$("#download-button").on("click", function () {
  // if (all !== "all") {
  let id = [];
  $.map($("input[name='item[]']:checked"), function (item) {
    id.push($(item).val());
  });
  ipc.send("print-to-pdf", id)
  // } else {
  //   ipc.send("print-to-pdf", all)
  // }
});