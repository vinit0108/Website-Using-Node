var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "shopping"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE items (itemid int(11) PRIMARY KEY AUTO_INCREMENT, userid int(11), date1 varchar(32), time1 varchar(32), price int(5),category varchar(32),prodname varchar(32))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});