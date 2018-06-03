var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bank"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE account (accountno int(11) PRIMARY KEY, name varchar(32), date1 varchar(32), time1 varchar(32), balance int(5))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});