const sqlite = require('sqlite3');
const path = require('path');

let db = new sqlite.Database(path.join(__dirname, '../../database.db'));

module.exports.getClients = function (page) {
  return new Promise(function (resolve, reject) {
    let query = "SELECT * FROM client";
    if (page)
      query += ' LIMIT ' + ((page - 1) * 20) + ', 20';
    db.serialize(() => {
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

module.exports.getTotalClients = function () {
  return new Promise(function (resolve, reject) {
    let query = "SELECT total(*) FROM client";
    db.serialize(function () {
      db.get(query, function (err, rows) {
        if (!err) {
          resolve(rows)
        } else {
          reject(err)
        }
      })
    })
  })
};

module.exports.deleteClient = function (id) {
  db.serialize(function () {
    db.run("DELETE FROM client WHERE id=?", [id])
  })
};

module.exports.postClient = function (data) {
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      var stmt = db.prepare("INSERT INTO client (firstname, lastname, cin, gender, date_added) VALUES (?, ? ,? ,?, strftime('%d/%m/%Y','now'))");
      stmt.run([data.firstname, data.lastname, data.cin, data.gender])
    })
  })
};
