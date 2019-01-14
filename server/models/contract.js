let sqlite = require('sqlite3');
let path = require('path');

let db = new sqlite.Database(path.join(__dirname, '../../database.db'));

module.exports.getContracts = function (page, id, active) {
  return new Promise(function (resolve, reject) {
    let query = "SELECT c.*, a.type, a.floor, a.number, b.address, c2.name as client, a.location_price  FROM contract as c left join apartment a on c.id_apartment = a.id left join building b on a.id_building = b.id LEFT JOIN client c2 on c.id_client = c2.id";
    if (active) {
      query += " Where (date_end='' or strftime('%m/%Y') <= date_end) and strftime('%m/%Y') >= date_begin";
      // and c.id in (" + id.join() + ")"
    }
    if (page) {
      query += " LIMIT " + ((page - 1) * 20) + ", 20"
    }
    db.serialize(function () {
      db.all(query, function (err, rows) {
        if (!err) {
          resolve(rows);
        } else
          reject(err);
      })
    })
  });
};

module.exports.getTotalContracts = function () {
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      db.get('SELECT count(*) as total FROM contract', function (err, row) {
        if (!err) {
          resolve(row)
        } else {
          reject(err)
        }
      })
    })
  })
};

module.exports.postContract = function (data) {
  return new Promise(function () {
    db.serialize(function () {
      db.run("INSERT INTO contract (id_apartment, id_client, advanced_price, tax, date_begin, date_end, date_added) VALUES (?, ?, ?, ?, ?, ?, strftime('%d/%m/%Y','now'))", [data.apartment, data.client, data.advanced_price, data.tax, data.dateBegin, data.dateEnd])
    })
  });
};

module.exports.deleteContract = function (id) {
  return new Promise(function () {
    db.serialize(function () {
      let query = "DELETE FROM contract WHERE id in (" + id.join() + ")";
      db.run(query)
    })
  })
};