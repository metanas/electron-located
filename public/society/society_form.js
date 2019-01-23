$('#add-button').on('click', function () {
    let name = "";
    let path = "";
    if(typeof $('.image-upload')[0].files[0] !== "undefined"){
        name = $('.image-upload')[0].files[0].name;
        path = $('.image-upload')[0].files[0].name;
    }

    var data = {
        image_name: name,
        image_path: path,
        name: $('input[name="name"]').val(),
        headquarters: $('input[name="headquarters"]').val(),
        start: $('input[name="start"]').val(),
        cne: $('input[name="cne"]').val(),
        address: $('input[name="address"]').val(),
        telephone: $('input[name="telephone"]').val(),
    };
    ipc.send('society_form', data);
});

ipc.on("society_form_reply", function (event) {
   myLoad("../society/society_list.html");
});