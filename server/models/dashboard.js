let sqlite = require('sqlite3');
let path = require('path');

let db = new sqlite.Database(path.join(__dirname, '../../database.db'));

module.exports.getDashboard = function () {

  return new Promise(function (resolve, reject) {

    db.serialize(function () {
      db.all('SELECT * FROM client', function (err, rows) {
        if(!err){
          resolve(rows)
        }else{
          reject(err)
        }
      })
    })
  })
};