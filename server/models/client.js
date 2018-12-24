const sqlite = require('sqlite3');
const path = require('path');

let db = new sqlite.Database(path.join(__dirname, '../../database.db'));

module.exports.postClient = function (data) {

  return new Promise(function (resolve, reject) {

    db.serialize(function () {
      console.log(data);
      var stmt = db.prepare("INSERT INTO client (firstname, lastname, cin, gender) VALUES (?, ? ,? ,?)");
      stmt.run([data.firstname, data.lastname, data.cin, data.gender])
    })
  })
}
