var http = require('http');

var express = require('express');
var connect = require('connect');

var serveStatic = require('serve-static');

var mysql = require('mysql');

var bodyParser = require('body-parser');

var name1;



var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: true });



var con = mysql.createConnection({

    host: "localhost",

    user: "root",

    password: "",

    database: "shopping"

});



app.get('/login', function (req, res) {

    var rr1 = `

    <html>



    <head>

        <title>Making Get Requests</title>

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"

            crossorigin="anonymous">

    </head>



    <body>

	

	<center><h1>LOGIN PAGE</h1></center>

        <center>

		<br>

		<br>

        <form method='post' action='/'>

            <div class="col-md-4" style="padding-top: 10px;">

                <div class="form-group">

                    <input type="text" class="form-control" name="user" placeholder="User Id"/>

                </div>

				<div class="form-group">

                    <input type="text" class="form-control" name="pass" placeholder="Password"/>

                </div>

                <div class="form-group">

                    <button class="button button-default" formaction="log" name="submitbtn" type="submit" value="ins">LOGIN</button>

                </div>

            </div>

        </form>

		</center>

    </body>

    </html>

    `;

    res.send(rr1);

})





app.get('/shop', function (req, res) {

    var rr = `

    <html>



    <head>

        <title>Making Get Requests</title>

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"

            crossorigin="anonymous">

    </head>



    <body>

	

	<center><h1>WELCOME TO SHOPPING MART</h1></center>

        <center>

		<br>

		<br>

        <form method='post' action='/'>

            <div class="col-md-4" style="padding-top: 10px;">

                <div class="form-group">

                    <input type="number" class="form-control" name="userid" placeholder="User Id" max="9999" min="100" />

                </div>

                <div class="form-group">

					<!--<input type="text" class="form-control" name="category" placeholder="Category"/>-->

                    <select class="form-control" name="category">

					<option selected>--Choose One--</option>

					<option>Gadget</option>

					<option>Garments</option>

					<option>Others</option>

					</select>

                </div>

               

                <div class="form-group">

                    <input type="DATE" class="form-control" name="date1" placeholder="DATE" />

                </div>

                <div class="form-group">

                    <input type="TIME" class="form-control" name="time1" placeholder="TIME" />

                </div>

                <div class="form-group">

					<!--<input type="text" class="form-control" name="product" placeholder="Product Name"/>-->

                    <select class="form-control" name="product">

					<option selected>--Choose One--</option>

					<option>Laptop</option>

					<option>Mobile</option>

					<option>Earphone</option>

					<option>Ice-Cream</option>

					<option>Pant</option>

					<option>Shirt</option>

					<option>Drone</option>

					<option>Pen</option>

					<option>Toy</option>

					<option>Chain</option>

					</select>

                </div>



                

                <div class="form-group">

                    <button class="button button-default" formaction="Add" name="submitbtn" type="submit" value="ins">ADD ITEM</button>

                    <button class="button button-default" formaction="Delete" name="submitbtn" type="submit" value="search">REMOVE ITEM</button>

					<button class="button button-default" formaction="Bill" name="submitbtn" type="submit" value="search">BILL</button>

                </div>

            </div>

        </form>

		</center>

    </body>

    </html>

    `;

    res.send(rr);

})



app.post('/log', urlencodedParser, function (req, res) {

    var user1 = parseInt(req.body.user);

    var pass1 = parseInt(req.body.pass);

	

	var sql1="SELECT userid FROM login WHERE userid="+user1+" and password="+pass1;

	con.query(sql1, function (err, result) {

	if (err) throw err;

});

	res.redirect("/shop");

    res.end();

});



app.post('/Add', urlencodedParser, function (req, res) {

    var userid1 = parseInt(req.body.userid);

    var category1 = req.body.category;

    var date1 = req.body.date1;

    var time1 = req.body.time1;

    var product1 = req.body.product;

	var val;

	

	var sql1="SELECT price FROM product WHERE product.prodname LIKE "+"'"+product1+"'";

	con.query(sql1, function (err, result, fields) {

	if (err) throw err;

	val=result[0].price;

	var x=parseInt(val);

    var sql = "INSERT INTO items(userid,date1,time1,price,category,prodname)values(" + userid1 + ","+"'" +date1 +"'"+","+"'" + time1 + "'"+"," + x +","+"'" + category1 + "'"+","+"'"+ product1 +"')";

    con.query(sql, function (err, res) {

        if (err) throw err;

    });

    //res.redirect("/r");

});

    res.send("Insert Successfull");

    res.end();

});



app.post('/Delete', urlencodedParser, function (req, res) {

    var userid1 = parseInt(req.body.userid);

    var product1 = req.body.product;



    var sql = "DELETE FROM items WHERE prodname LIKE "+"'"+product1+"'"+" and items.userid="+userid1;

    con.query(sql, function (err, res) {

        if (err) throw err;

    });

    //res.redirect("/r");

    res.send("Deleted Successfully");

    res.end();

});



app.post('/Bill', urlencodedParser, function (req, res) {

    var userid1 = parseInt(req.body.userid);

	var sql1="SELECT itemid,category,prodname,price FROM items WHERE items.userid="+userid1;

	con.query(sql1, function (err, result) {

	if (err) throw err;

	console.log("ITEMID     CATEGORY      PRODUCT NAME       PRICE");

	for(var i=0;i<result.length;i++)

	{

		console.log(""+result[i].itemid+"           "+result[i].category+"              "+result[i].prodname+"             "+result[i].price);

	}

    var sql = "SELECT SUM(price) AS sum FROM items WHERE items.userid="+userid1;

    con.query(sql, function (err, res) {

        if (err) throw err;

		console.log("Amount to Pay: "+res[0].sum);

    });

	});

    //res.redirect("/r");

	res.send("BILL GENERATED");

    res.end();

});



app.listen(9050);

