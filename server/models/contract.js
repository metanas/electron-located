let sqlite = require('sqlite3');
let path = require('path');

let db = new sqlite.Database(path.join(__dirname, '../../database.db'));

module.exports.getContracts = function (id) {
  return new Promise(function (resolve, reject) {
    var query = "SELECT c.*, cl.id as id_client, cl.lastname , cl.firstname, cl.cin, floor, area, nb_bed, description, type, location_price, advance_price, tax, other_charge, a.id as id_apartment, a.number as nApartment, b.address as aBuilding, postcode, city, b.telephone as BTele, b.name as nBuilding, headquarters, s.address as aSociety ,s.telephone as STele, image, s.name as nSociety FROM contract c LEFT JOIN client as cl on (c.id_client = cl.id) LEFT JOIN apartment as a on (c.id_apartment = a.id) LEFT JOIN building as b on (a.id_building = b.id) LEFT JOIN Society as s on (s.id = b.id_society)";
    if (id) {
      query += "Where (date_end='' or strftime('%m/%Y') <= date_end) and strftime('%m/%Y') >= date_begin and c.id in (" + id.join() + ")"
    }
    console.log(query);
    db.serialize(function () {
      db.all(query, function (err, rows) {
        if (!err)
          resolve(rows);
        else
          reject(err);
      })
    })
  });
};

module.exports.postContract = function (data) {
  return new Promise(function () {
    db.serialize(function () {
      db.run("INSERT INTO contract (id_apartment, id_client, date_begin, date_end, date_added) VALUES (?, ?, ?, ?, strftime('%d/%m/%Y','now'))", [data.apartment, data.client, data.dateBegin, data.dateEnd])
    })
  });
};

module.exports.deleteContract = function (id) {
  return new Promise(function () {
    db.serialize(function () {
      let query = "DELETE FROM contract WHERE id in (" + id.join() + ")";
      db.run(query)
    })
  })
};