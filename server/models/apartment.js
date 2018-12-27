let sqlite = require('sqlite3');
let path = require('path');

let db = new sqlite.Database(path.join(__dirname, '../../database.db'));

module.exports.getApartmentsFromBuilding = function (id) {
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

module.exports.getApartments = function () {
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      db.all('SELECT * FROM apartment', function (err, rows) {
        if (!err) {
          resolve(rows)
        } else {
          reject(err)
        }
      })
    })
  });
};

module.exports.getApartment = function (id) {
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      db.all('SELECT * FROM apartment where id=?', [id], function (err, rows) {
        if (!err) {
          resolve(rows)
        } else {
          reject(err)
        }
      })
    })
  })
};

module.exports.getTotalBuildingApartments = function (id) {
  return new Promise(function (resolve, reject) {
    let query = "SELECT total(*) FROM apartment where id_building=?";
    db.serialize(function () {
      db.all(query, [id], function (err, rows) {
        if (!err) {
          resolve(rows)
        } else {
          reject(err)
        }
      })
    })
  })
};

module.exports.getTotalApartments = function () {
  return new Promise(function (resolve, reject) {
    let query = "SELECT total(*) FROM apartment";
    db.serialize(function () {
      db.all(query, function (err, rows) {
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
      var stmt = db.prepare('INSERT INTO apartment (number, floor, area, description, nb_bed, location_price, advance_price, tax, other_charge, id_building) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
      stmt.run([data.number, data.floor, data.area, data.description, data.nb_bed, data.location_price, data.advance_price, data.tax, data.other_charge, data.id_building]);
      resolve("Success")
    });
  })
};

module.exports.deleteApartment = (id) => {
  db.serialize(function () {
    db.run("DELETE FROM apartment WHERE id=?", [id])
  })
};
