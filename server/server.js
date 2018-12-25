let express = require('express');
var bodyParser = require('body-parser');
let dashboard = require('./models/dashboard');
let society = require('./models/society');
let building = require('./models/building');
let apartment = require('./models/apartment');
let client = require('./models/client');
let ipc = require('electron').ipcMain;
let app = express();
app.use(bodyParser.json());


app.get('/dashboard', function (req, res) {
  dashboard.getDashboard().then(function (response) {
    res.json(response);
  })
});
// Society Function
// ==========================================================================
ipc.on('society_list', (event) => {
  society.getSocietyList().then(function (response) {
    event.sender.send('society_list_reply', response)
  })
});


ipc.on('society_form', function (event, data) {
  society.postSociety(data).then(function (response) {

  })
});
// ==========================================================================


// Building Function
// ==========================================================================
ipc.on('building_list', function (event, id) {
  building.getBuildingList(id).then(function (response) {
    event.sender.send('building_list_reply', response)
  })
});

ipc.on('building_form', function (event, data) {
  building.postBuilding(data).then(function (response) {

  })
});
// ==========================================================================

// Apartment Function
// ==========================================================================
ipc.on('apartment_list', (event, id) => {
  apartment.getApartmentList(id).then(function (response) {
    event.sender.send("apartment_list_reply", response);
  })
});

ipc.on('apartment_form', function (event, data) {
  apartment.postApartment(data).then(function (response) {
    event.sender.send('apartment_form_reply', response)
  })
});
// ==========================================================================

// Client Function
// ==========================================================================
ipc.on('client_list', function (event) {
  client.getClients().then(function (response) {
    event.sender.send('client_list_reply', response)
  })
});

ipc.on('client_form', (event, data) => {
  client.postClient(data).then(function () {

  })
});

// ==========================================================================

app.listen(3000, function (response) {

});