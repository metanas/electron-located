let sqlite = require('sqlite3');
let path = require('path');
let building = require('./building');

let db = new sqlite.Database(path.join(__dirname, '../../database.db'));

module.exports.getSocieties = function () {
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      db.all('SELECT * FROM Society', function (err, rows) {
        if (!err) {
          resolve(rows)
        } else {
          reject(err)
        }
      })
    })
  })
};

module.exports.getSociety = function (id) {
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      db.get("SELECT * FROM Society Where id=?", [id], function (err, row) {
        if (!err) {
          resolve(row)
        } else {
          reject(err)
        }
      })
    })
  })
};

module.exports.getTotalSocietyBuildings = function (id) {
  return new Promise(function (resolve, reject) {
    let query = "SELECT total(*) FROM building where id_society=?";
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

module.exports.getTotalSocieties = function () {
  return new Promise(function (resolve, reject) {
    let query = "SELECT total(*) FROM Society";
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

module.exports.deleteSociety = function (id) {
  db.serialize(function () {
    db.all("SELECT id FROM building where id_society=?", [id], function (err, rows) {
      rows.forEach(function (id_building) {
        building.deleteBuilding(id_building)
      })
    });
    db.run("DELETE FROM Society WHERE id=?", [id])
  })
};

module.exports.postSociety = function (data) {
  return new Promise(function (resolve, reject) {

    db.serialize(function () {
      var stmt = db.prepare('INSERT INTO Society VALUES(null, ?, ?, ?, ?, ?)');
      stmt.run([data.name, data.headquarters, data.telephone, data.image, data.address]);
      resolve("Success")
    });
  });
};