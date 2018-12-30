let sqlite = require('sqlite3');
let path = require('path');

let db = new sqlite.Database(path.join(__dirname, '../../database.db'));

module.exports.postPayment = function (data) {
  return new Promise(function () {
    db.serialize(function () {
      db.run("INSERT OR IGNORE INTO payment (id_apartment, id_client, date, price_paid) VALUES (?,?,?,?)", [data.id_apartment, data.id_client, data.date, data.price_paid])
    })
  })
};