let sqlite = require('sqlite3');
let path = require('path');

let db = new sqlite.Database(path.join(__dirname, '../../database.db'));

module.exports.getApartmentsFromBuilding = function (page, id) {
  return new Promise(function (resolve, reject) {
    let query = 'SELECT a.*, c2.name as client, b.address as address FROM apartment as a left join contract c on a.id = c.id_apartment left join client c2 on c.id_client = c2.id left join building b on a.id_building = b.id where id_building=?';
    if (page)
      query += ' LIMIT ' + ((page - 1) * 20) + ', 20';
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

module.exports.getApartments = function (page) {
  return new Promise(function (resolve, reject) {
    let query = 'SELECT a.*, c2.name as client, b.address as address FROM apartment as a left join contract c on a.id = c.id_apartment left join client c2 on c.id_client = c2.id left join building b on a.id_building = b.id';
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
      db.all('SELECT * FROM apartment where id=?', [id], function (err, rows) {
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
      var stmt = db.prepare("INSERT INTO apartment (number, floor, area, description, nb_bed, location_price, advance_price, tax, other_charge, id_building, date_added) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, strftime('%d/%m/%Y','now'))");
      stmt.run([data.number, data.floor, data.area, data.description, data.nb_bed, data.location_price, data.advance_price, data.tax, data.other_charge, data.id_building]);
      resolve("Success")
    });
  })
};

module.exports.deleteApartment = (id) => {
  db.serialize(function () {
    db.run("DELETE FROM apartment WHERE id=?", [id])
  })
};
