var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employee"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE Employee(SSN varchar(13) PRIMARY KEY, name varchar(32), gender varchar(6), salary int(11), department varchar(20))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});