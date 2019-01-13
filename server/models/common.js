let sqlite = require('sqlite3');
let path = require('path');

let db = new sqlite.Database(path.join(__dirname, '../../database.db'));

module.exports.getLastId = function () {
  return new Promise(function (resolve, reject) {
    db.serialize(function () {
      db.get("SELECT last_insert_rowid()", function (err, row) {
        if (!err) {
          resolve(row)
        } else {
          reject(err)
        }
      });
    })
  })
};