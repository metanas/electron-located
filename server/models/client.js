const sqlite = require('sqlite3');
const path = require('path');

let db = new sqlite.Database(path.join(__dirname, '../../database.db'));

module.exports.getClients = function () {
  return new Promise(function (resolve, reject) {
    db.serialize(() => {
      db.all("SELECT * FROM client", function (err, rows) {
        if (!err) {
          resolve(rows)
        } else {
          reject(err)
        }
      })
    })
  })
};

module.exports.getClient = function (id) {
  return new Promise(function (resolve, reject) {
    db.serialize(() => {
      db.all("SELECT * FROM client where id=?", [id], function (err, rows) {
        if (!err) {
          resolve(rows)
        } else {
          reject(err)
        }
      })
    })
  })
};


module.exports.postClient = function (data) {

  return new Promise(function (resolve, reject) {

    db.serialize(function () {
      var stmt = db.prepare("INSERT INTO client (firstname, lastname, cin, gender) VALUES (?, ? ,? ,?)");
      stmt.run([data.firstname, data.lastname, data.cin, data.gender])
    })
  })
};
