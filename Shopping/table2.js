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

  var sql = "CREATE TABLE login (userid int(11) PRIMARY KEY,password varchar(16) NOT NULL)";

  con.query(sql, function (err, result) {

    if (err) throw err;

    console.log("Table created");

  });

});