let sqlite = require('sqlite3');
let path = require('path');

let db = new sqlite.Database(path.join(__dirname, '../../database.db'));

module.exports.getSocietyList = function () {

  return new Promise(function (resolve, reject) {

    db.serialize(function () {
      db.all('SELECT * FROM Society', function (err, rows) {
        if (!err) {
          resolve(rows)
        } else {
          reject(err)
        }
      })
    })
  })
};

module.exports.postSociety = function (name, headquarters, telephone, image) {
  return new Promise(function (resolve, reject) {

    db.serialize(function () {
      var stmt = db.prepare('INSERT INTO Society VALUES(null, ?, ?, ?, ?)');
      stmt.run([name, headquarters, telephone, image]);
      resolve("Success")
    });

  });
};