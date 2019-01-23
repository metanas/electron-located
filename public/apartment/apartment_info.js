$(document).ready(function () {
  ipc.send("apartment_info", global_id);
  global_id = null;
});

ipc.on("apartment_info_reply", (event, data) => {
  console.log(data);
});