var http = require('http');
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var name1;

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: true });

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bank"
});

app.get('/r', function (req, res) {
    var rr = `
    <html>

    <head>
        <title>Making Get Requests</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossorigin="anonymous">
    </head>

    <body>
        
        <form method='post' action='/'>
            <div class="col-md-4" style="padding-top: 10px;">
                <div class="form-group">
                    <input type="number" class="form-control" name="accountno" placeholder="Account No" max="9999999999" min="1000000000" />
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" name="name" placeholder="Name" />
                </div>
               
                <div class="form-group">
                    <input type="DATE" class="form-control" name="date1" placeholder="DATE" />
                </div>
                <div class="form-group">
                    <input type="TIME" class="form-control" name="time1" placeholder="TIME" />
                </div>
                <div class="form-group">
                    <input type="number" class="form-control" name="balance" placeholder="BALANCE" />
                </div>
                <div class="form-group">
                    <input type="number" class="form-control" name="amount" placeholder="ENTER AMOUNT" />
                </div>
        

                
                <div class="form-group">
                    <button class="button button-default" formaction="AddtoDb" name="submitbtn" type="submit" value="ins">Create Account</button>
                    <button class="button button-default" formaction="deposit" name="submitbtn" type="submit" value="search">Deposit</button>
                    <button class="button button-default" formaction="Withdrawal" name="submitbtn" type="submit" value="search">Withdrawal Money</button>
                </div>
            </div>
        </form>
    </body>
    </html>
    `;
    res.send(rr);
})






app.post('/AddtoDb', urlencodedParser, function (req, res) {
    var accountno = parseInt(req.body.accountno);
    var name = req.body.name;
    var date1 = req.body.date1;
    var time1 = req.body.time1;
    var balance = parseFloat(req.body.balance);

    var sql = "INSERT INTO account values(" + accountno + ",'" +name +"','" + date1 + "','" +time1 +"'," + balance + ");";
    console.log(sql);
    con.query(sql, function (err, res) {
        if (err) throw err;
        console.log(accountno + " " + name + " " + date1 + " " + time1 + " " + balance + " Inserted");
    });
    //res.redirect("/r");
    res.send("Insert Successfully");
    res.end();
});

app.post('/deposit', urlencodedParser, function (req, res) {
    var accountno = parseInt(req.body.accountno);
    
    
    var amount = parseFloat(req.body.amount);
   
   // var x = money+amt;

    var sql = "UPDATE account b SET b.balance = b.balance+'"+amount+"' WHERE b.accountno="+accountno;
    console.log(sql);
    con.query(sql, function (err, res) {
        if (err) throw err;
        //console.log(accno + " " + name + " " + time + " "+ date +" "+money+ "Inserted");
    });
    //res.redirect("/r");
    res.send("Deposited Successfully");
    res.end();
});


app.post('/Withdrawal', urlencodedParser, function (req, res) {
    var accountno = parseInt(req.body.accountno);
    
    
    var amount = parseFloat(req.body.amount);
   
   // var x = money+amt;

    var sql = "UPDATE account b SET b.balance = b.balance-'"+amount+"' WHERE b.accountno="+accountno+" and b.balance>500" ;
    console.log(sql);
    con.query(sql, function (err, res) {
        if (err) throw err;
        //console.log(accno + " " + name + " " + time + " "+ date +" "+money+ "Inserted");
    });
    //res.redirect("/r");
    res.send("Withdraw  Successfully");
    res.end();
});


app.listen(9000);