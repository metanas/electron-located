let sqlite = require('sqlite3');
let path = require('path');
let building = require('./building');

let db = new sqlite.Database(path.join(__dirname, '../../database.db'));

module.exports.getSocieties = function (page) {
  return new Promise(function (resolve, reject) {
    let query = 'SELECT * from society';
    if (page)
      query += ' LIMIT ' + (20 * (page - 1)) + ', 20';
    db.serialize(function () {
      db.all(query, function (err, rows) {
        if (!err) {
          resolve(rows)
        } else {
          reject(err);
        }
      })
    })
  })
};

module.exports.getSociety = function (id) {
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      db.get("select s.*, count(b.id) as nb_building, count(a.id) as apart_count, count(cn.id) as apart_taken, COALESCE(sum(p.price),0) as total_price , COALESCE(sum(p.price_paid),0) as total_price_paid from society as s LEFT JOIN building b on s.id = b.id_society left join apartment a on b.id = a.id_building left join contract as cn on cn.id_apartment = a.id left join payment p on cn.id = p.id_contract Where s.id=?", [id], function (err, row) {
        if (!err) {
          resolve(row)
        } else {
          reject(err)
        }
      })
    })
  })
};

module.exports.getSocietyBuildings = function (page, id) {
  return new Promise(function (resolve, reject) {
    let query = "SELECT * FROM building where id_society=?";
    if (page)
      query += ' LIMIT ' + (20 * (page - 1)) + ', 20';
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

module.exports.getSocietySumPaymentValue = function(id){
  return new Promise(function (resolve, reject) {
    let query = "SELECT COALESCE(sum(price), 0) as total_price, COALESCE(sum(price_paid), 0) as total_price_paid from payment left join contract c on payment.id_contract = c.id left join apartment a on c.id_apartment = a.id join building b on a.id_building = b.id where b.id_society=?";
    db.serialize(function () {
      db.get(query, [id], function (err, row) {
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
    let query = "SELECT count(*) as total FROM building where id_society=?";
    db.serialize(function () {
      db.get(query, [id], function (err, rows) {
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
    let query = "SELECT count(*) as total FROM society";
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

module.exports.deleteSociety = function (id) {
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      db.all("SELECT id FROM building where id_society in (" + id.join() + ")", function (err, rows) {
        rows.forEach(function (id_building) {
          building.deleteBuilding(id_building)
        })
      });
      db.run("DELETE FROM society WHERE id in (" + id.join() + ")", function (err) {
        console.log(err);
        if (!err) {
          resolve(this.lastID)
        }
      })
    })
  })
};

module.exports.postSociety = function (data) {
  return new Promise(function (resolve, reject) {

    db.serialize(function () {
      var stmt = db.prepare("INSERT INTO society (name, headquarters, cne, telephone, image, address, date_added) VALUES(?, ?, ?, ?, ?, ?, strftime('%d/%m/%Y','now'))");
      stmt.run([data.name, data.headquarters, data.cne, data.telephone, data.image_name, data.address]);
      resolve("Success")
    });
  });
};