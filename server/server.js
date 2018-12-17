let express = require('express');
let app = express();
let dashboard = require('./models/dashboard')
let society = require('./models/society')
let building = require('./models/building')


app.get('/dashboard', function (req, res) {
  dashboard.getDashboard().then(function (response) {
    res.json(response);
  })
});

app.get('/society_list', function (req, res) {
  society.getSocietyList().then(function (response) {
    res.json(response);
  })
});

app.get('/society_form', function (req, res) {
  society.postSociety(req.query.name, req.query.headquateres, req.query.telephone,'').then(function (response) {
    res.json(response)
  })
});

app.get('/building_list', function (req, res) {
  building.getBuildingList(req.query.id).then(function (response) {
    res.json(response)
  })
});

app.listen(3000, function (response) {

});