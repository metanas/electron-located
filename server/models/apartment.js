let sqlite = require('sqlite3');
let path = require('path');

let db = new sqlite.Database(path.join(__dirname, '../../database.db'));

module.exports.getApartmentList = function (id) {
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      db.all('SELECT * FROM apartment where id_building=?', [id], function (err, rows) {
        if (!err) {
          resolve(rows)
        } else {
          reject(err)
        }
      })
    })
  })
};

module.exports.postApartment = function (data) {
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      var stmt = db.prepare('INSERT INTO apartment (number, floor, area, description, nb_bed, location_price, advance_price, tax, other_charge, id_building) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)');
      stmt.run([data.number, data.floor, data.area, data.description, data.nb_bed, data.location_price, data.advance_price, data.tax, data.other_charge, data.id_building]);
      resolve("Success")
    });
  })
}
