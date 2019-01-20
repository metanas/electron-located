let sqlite = require('sqlite3');
let path = require('path');

let db = new sqlite.Database(path.join(__dirname, '../../database.db'));

module.exports.postPayment = function (data) {
  return new Promise(function () {
    db.serialize(function () {
      db.run("INSERT OR IGNORE INTO payment (id,id_contract, date, price, price_paid, date_added) VALUES (?, ?,strftime('%m/%Y','now'),?, 0, strftime('%H:%M %d/%m/%Y','now'))", [data.id, data.id_contract, data.price])
    })
  })
};

module.exports.putPayment = (id, price) => {
  return new Promise( (resolve, reject) => {
    db.serialize(function () {
      db.run("UPDATE payment SET price_paid=? WHERE id=?",[price, id], function (err) {
        if(!err){
          resolve(this.lastID)
        }
      })
    })
  })
};

module.exports.getPayments = function (page, id) {
  return new Promise(function (resolve, reject) {
    let query = "SELECT p.*, a.number, a.floor, a.type, c2.name, b.address, b.city FROM payment as p left join contract c on p.id_contract = c.id left join apartment a on c.id_apartment = a.id left join client c2 on c.id_client = c2.id left join building b on a.id_building = b.id order by date DESC";
    if (page)
      query += " LIMIT " + ((page - 1) * 20) + ", 20";
    if (id)
      query += " WHERE id_contract in (" + id.join() + ")";
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

module.exports.getPayment = (id) => {
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      db.get("SELECT * from payment where id=?", [id], function (err, row) {
        if (!err) {
          resolve(row)
        } else {
          reject(err)
        }
      })
    })
  })
};

module.exports.getTotalPayments = function () {
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      db.get("SELECT count(*) as total FROM payment", function (err, row) {
        if (!err) {
          resolve(row)
        } else {
          reject(err)
        }
      })
    })
  })
};

module.exports.getPaymentUnpaidClient = function (id) {
  return new Promise(function (resolve, reject) {
    db.serialize(() => {
      db.get("SELECT count(*) as total_unpaid, COALESCE(sum(p.price), 0) as price, COALESCE(sum(p.price_paid), 0) as price_paid FROM payment p left join contract c on p.id_contract = c.id where c.id_client=? and (p.price - p.price_paid <> 0)", [id], function (err, row) {
        if (!err) {
          resolve(row)
        } else {
          reject(err)
        }
      })
    })
  })
};

module.exports.updatePayment = function (id) {
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      db.run("UPDATE payment set print=strftime('%H:%M %d/%m/%Y','now') where  id=?", [id], function (err) {
        if (!err) {
          resolve(this.lastID)
        }
      })
    })
  })
};