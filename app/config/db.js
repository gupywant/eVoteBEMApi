var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "unnamed48",
  password: "12345678",
  database: "evotebem"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = con;