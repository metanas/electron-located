let sqlite = require('sqlite3');
let path = require('path');

let db = new sqlite.Database(path.join(__dirname, '../../database.db'));

module.exports.getBuildingList = function (id) {
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      if (id !== null) {
        db.all('SELECT * FROM building where id_society=?', [id], function (err, rows) {
          if (!err) {
            resolve(rows)
          } else {
            reject(err)
          }
        })
      } else {
        db.all('SELECT * FROM building', function (err, rows) {
          if (!err) {
            resolve(rows)
          } else {
            reject(err)
          }
        })
      }
    })
  })
};

module.exports.getBuilding = function (id) {
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      if (id !== null) {
        db.all('SELECT * FROM building where id=?', [id], function (err, rows) {
          if (!err) {
            resolve(rows)
          } else {
            reject(err)
          }
        })
      } else {
        db.all('SELECT * FROM building', function (err, rows) {
          if (!err) {
            resolve(rows)
          } else {
            reject(err)
          }
        })
      }
    })
  })
};


module.exports.postBuilding = function (data) {
  return new Promise(function (resolve, reject) {

    db.serialize(function () {
      var stmt = db.prepare('INSERT INTO building VALUES(null, ?, ?, ?, ?, ?, ?, ?)');
      stmt.run([data.name, data.address, data.postcode, data.city, data.telephone, data.nb_floor, data.society_id]);
      resolve("Success")
    });

  });
};