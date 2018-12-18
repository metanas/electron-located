let sqlite = require('sqlite3');
let path = require('path');

let db = new sqlite.Database(path.join(__dirname, '../../database.db'));

module.exports.getBuildingList = function (id) {
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      db.all('SELECT * FROM building where id_society=?', [id], function (err, rows) {
        if (!err) {
          resolve(rows)
        } else {
          reject(err)
        }
      })
    })
  })
};

module.exports.postBuilding = function (name, address, nb_floor, city, postcode, telephone, society_id) {
  return new Promise(function (resolve, reject) {

    db.serialize(function () {
      var stmt = db.prepare('INSERT INTO building VALUES(null, ?, ?, ?, ?, ?, ?, ?)');
      stmt.run([name, address, postcode, city, telephone, nb_floor, society_id]);
      resolve("Success")
    });

  });
};