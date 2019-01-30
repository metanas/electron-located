$('#add-button').on('click', function () {
  let telephone_info = [];
  let telephone = $("input[name='telephone[]']");
  let name_telephone = $("input[name='name-telephone[]']");

  for (let i = 0; i < telephone.length; i++) {
    telephone_info.push({"name": name_telephone[i].value, "telephone": telephone[i].value})
  }
  const data = {
    type: $('input[name="type"]:checked').val(),
    name: $('input[name="name"]').val(),
    address: $('input[name="address"]').val(),
    telephone: telephone_info,
    identification: $('input[name="identification"]').val(),
  };

  ipc.send('client_form', data);
});

ipc.on("client_form_reply", function (event) {
  myLoad("../client/client_list.html");
});

$('#add-telephone').on("click", function () {
  $("input[name=\"telephone[]\"]").last().after("<input type=\"text\" name=\"name-telephone[]\" class=\"form-control col-md-4\" placeholder=\"domicile\">" +
    "<input type=\"tel\" name=\"telephone[]\" class=\"form-control col-md-8\" placeholder=\"telephone\">")
});
