var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "examination"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE details(USN varchar(13) PRIMARY KEY, name varchar(32), attendance int(4),cie float(5),branch varchar(30))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});