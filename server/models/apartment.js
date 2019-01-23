let sqlite = require('sqlite3');
let path = require('path');

let db = new sqlite.Database(path.join(__dirname, '../../database.db'));

module.exports.getApartments = function (page) {
  return new Promise(function (resolve, reject) {
    let query = 'SELECT * FROM apartment order by id_building';
    if (page)
      query += " LIMIT " + ((page - 1) * 20) + ", 20";
    db.serialize(function () {
      db.all(query, function (err, rows) {
        if (!err) {
          resolve(rows);
        } else {
          reject(err)
        }
      })
    })
  });
};

module.exports.getApartment = function (id) {
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      db.get('SELECT a.*, b.id_society, b.name, b.address FROM apartment as a left join building as b on(a.id_building=b.id) where a.id=?', [id], function (err, rows) {
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
    let query = "SELECT count(*) as total FROM apartment where id_building=?";
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

module.exports.getTotalApartments = function () {
  return new Promise(function (resolve, reject) {
    let query = "SELECT count(*) as total FROM apartment";
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


module.exports.postApartment = function (data) {
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      var stmt = db.prepare("INSERT INTO apartment (number, floor, area, description, location_price, type, id_building, date_added) VALUES(?, ?, ?, ?, ?, ?, ?, strftime('%d/%m/%Y','now'))");
      stmt.run([data.number, data.floor, data.area, data.description, data.location_price, data.type, data.id_building], function (err) {
        if (!err) {
          resolve(this.lastID)
        } else {
          reject(err);
        }
      });
    });
  })
};

module.exports.deleteApartment = (id) => {
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      db.run("DELETE FROM apartment WHERE id in (" + id.join() + ")", function (err) {
        if (!err) {
          resolve(this.lastID)
        } else {
          reject(err)
        }
      })
    })
  })
};

module.exports.deleteApartmentImage = function (id) {
  db.serialize(function () {
    db.run("DELETE FROM apartment_image where id in (" + id.join() + ")")
  })
};

module.exports.postApartmentImage = function (name, id) {
  db.serialize(function () {
    db.run("INSERT INTO apartment_image (name, id_apartment) VALUES (?, ?)", [name, id], function (err) {
    })
  })
};

module.exports.getFreeApartment = function () {
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      db.all("SELECT * FROM apartment where id not in (select id_apartment from contract where date_end < strftime(\"%m/%Y\", 'now'))", function (err, rows) {
        if (!err) {
          resolve(rows)
        } else {
          reject(err)
        }
      })
    })
  })
};

module.exports.getFreeApartmentFormBuilding = function (id) {
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      db.all("SELECT * FROM apartment where id not in (select id_apartment from contract where date_end < strftime(\"%m/%Y\", 'now'))", function (err, rows) {
        if (!err) {
          resolve(rows)
        } else {
          reject(err)
        }
      })
    })
  })
};