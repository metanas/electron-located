let sqlite = require('sqlite3');
let path = require('path');

let db = new sqlite.Database(path.join(__dirname, '../../database.db'));

module.exports.getBuildings = function (page) {
  return new Promise(function (resolve, reject) {
    let query = 'SELECT * from building';
    if (page) {
      query += ' LIMIT ' + ((page - 1) * 20) + ', 20';
    }
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

module.exports.getTotalBuildings = function () {
  return new Promise(function (resolve, reject) {
    let query = "SELECT count(*) as total FROM building";
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


module.exports.getTotalBuildingClientsById = function (id) {
  return new Promise(function (resolve, reject) {
    let query = 'SELECT count(c2.id) as total from building b left join apartment a on b.id = a.id_building left join contract c on a.id = c.id_apartment left join client c2 on c.id_client = c2.id where b.id=?';
    db.serialize(function () {
      db.get(query, [id], function (err, row) {
        if (!err) {
          resolve(row)
        } else {
          reject(err)
        }
      });
    })
  })
};

module.exports.getBuildingClientsById = function (id) {
  return new Promise(function (resolve, reject) {
    let query = 'SELECT c2.* from building b left join apartment a on b.id = a.id_building left join contract c on a.id = c.id_apartment left join client c2 on c.id_client = c2.id where b.id=?';
    db.serialize(function () {
      db.get(query, [id], function (err, row) {
        if (!err) {
          resolve(row)
        } else {
          reject(err)
        }
      });
    })
  })
};

module.exports.getBuilding = function (id) {
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      db.all('SELECT * FROM building where id=?', [id], function (err, rows) {
        if (!err) {
          resolve(rows)
        } else {
          reject(err)
        }
      })
    })
  })
};

module.exports.getBuildingApartments = function (page, id) {
  return new Promise(function (resolve, reject) {
    let query = "SELECT * FROM apartment where id_building=?";
    if (page) {
      query += ' LIMIT ' + ((page - 1) * 20) + ', 20';
    }
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

module.exports.getTotalBuildingApartments= function (id) {
  return new Promise(function (resolve, reject) {
    let query = "SELECT count(*) as total FROM apartment where id_building=?";
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


module.exports.deleteBuilding = function (id) {
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      db.run("DELETE FROM apartment WHERE id_building in (" + id.join() + ")")
        .run("DELETE FROM building WHERE id in (" + id.join() + ")" , function (err) {
          if(!err){
            resolve(this.lastID)
          }
        })
    })
  })
};


module.exports.postBuilding = function (data) {
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      var stmt = db.prepare("INSERT INTO building (name, address, postcode, city, nb_floor, id_society, date_added) VALUES(?, ?, ?, ?, ?, ?, strftime('%d/%m/%Y','now'))");
      stmt.run([data.name, data.address, data.postcode, data.city, data.nb_floor, data.society_id]);
    });

  });
};