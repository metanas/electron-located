let sqlite = require('sqlite3');
let path = require('path');

let db = new sqlite.Database(path.join(__dirname, '../../database.db'));

module.exports.getBuildingsFromSociety = function (id) {
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      db.all('SELECT * FROM building where id_society=?', [id], function (err, rows) {
        if (!err) {
          resolve(rows)
        } else {
          reject(err)
        }
      });
    })
  })
};

module.exports.getBuildings = function () {
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      db.all('SELECT * FROM building', function (err, rows) {
        if (!err) {
          resolve(rows)
        } else {
          reject(err)
        }
      })
    })
  })
};

module.exports.getBuilding = function (id) {
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      db.all('SELECT * FROM building where id=?', [id], function (err, rows) {
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

module.exports.getTotalBuildings = function () {
  return new Promise(function (resolve, reject) {
    let query = "SELECT total(*) FROM building";
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

module.exports.deleteBuilding = function (id) {
  db.serialize(function () {
    db.run("DELETE FROM apartment WHERE id_building=?", [id])
      .run("DELETE FROM building WHERE id=?", [id])
  })
};


module.exports.postBuilding = function (data) {
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      var stmt = db.prepare("INSERT INTO building (name,address, postcode, city, telephone, nb_floor, id_society, date_added) VALUES(?, ?, ?, ?, ?, ?, ?, strftime('%d/%m/%Y','now'))");
      stmt.run([data.name, data.address, data.postcode, data.city, data.telephone, data.nb_floor, data.society_id]);
    });

  });
};