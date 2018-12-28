let sqlite = require('sqlite3');
let path = require('path');

let db = new sqlite.Database(path.join(__dirname, '../../database.db'));

module.exports.getContracts = function () {
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      db.all("SELECT c.*, cl.lastname as nClient, a.number as nApartment, b.name as nBuilding, s.name as nSociety FROM contract c LEFT JOIN client as cl on (c.id_client = cl.id) LEFT JOIN apartment as a on (c.id_apartment = a.id) LEFT JOIN building as b on (a.id_building = b.id) LEFT JOIN Society as s on (s.id = b.id_society)", function (err, rows) {
        if (!err)
          resolve(rows);
        else
          reject(err);
      })
    })
  });
};