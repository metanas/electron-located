const sqlite = require('sqlite3');
const path = require('path');

let db = new sqlite.Database(path.join(__dirname, '../../database.db'));

module.exports.getClients = function (page) {
  return new Promise(function (resolve, reject) {
    let query = "SELECT c2.*, sum(p.price) as total_price, sum(p.price_paid) as total_price_paid FROM client c2 left join contract c on c2.id = c.id_client left join payment p on c.id = p.id_contract";
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
      db.get("SELECT c2.*, sum(p.price) as total_price, sum(p.price_paid) as total_price_paid FROM client c2 left join contract c on c2.id = c.id_client left join payment p on c.id = p.id_contract where c2.id=?", [id], function (err, rows) {
        if (!err) {
          console.log(rows);
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
    let query = "SELECT count(*) as total FROM client";
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
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      db.run("DELETE FROM client WHERE id in (" + id.join() + ")", function (err) {
        if (!err) {
          resolve(this.lastID)
        }
      })
    })
  });
};

module.exports.postClient = function (data) {
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      var stmt = db.prepare("INSERT INTO client (type, name, address, telephone, identification, date_added) VALUES (?, ?, ?, ?, ?, strftime('%d/%m/%Y','now'))");
      stmt.run([data.type, data.name, data.address, data.telephone, data.identification])
    })
  })
};
