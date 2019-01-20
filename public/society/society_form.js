$('#add-button').on('click', function () {
    var data = {
        image_name: $('.image-upload')[0].files[0].name,
        image_path: $('.image-upload')[0].files[0].path,
        name: $('input[name="name"]').val(),
        headquarters: $('input[name="headquarters"]').val(),
        cne: $('input[name="cne"]').val(),
        address: $('input[name="address"]').val(),
        telephone: $('input[name="telephone"]').val(),
    };
    ipc.send('society_form', data);
});

ipc.on("society_form_reply", function (event) {
   myLoad("../society/society_list.html");
});