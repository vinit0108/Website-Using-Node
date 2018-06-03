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

    database: "employee"

});



app.get('/send', function (req, res) {

    var rr = `

    <html>



    <head>

        <title>Making Get Requests</title>

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"

            crossorigin="anonymous">

    </head>



    <body>

	

	<center>

		<h1>company Details</h1>

        

        <form method='post' action='/'>

            <div class="col-md-4" style="padding-top: 10px;">

				

				<div class="control-group">

					<div class="controls">

						<input type="text" class="form-control" name="SSN" pattern="[A-Za-z0-9]{2,10}" placeholder="Please Enter SSN" title="Please enter valid SSN" required>

					</div>

				</div>

				<br>

				

				<div class="control-group">

					<div class="controls">

						<input type="text" class="form-control" name="name" placeholder="Please Enter Your Name" title="Name should be of min 2 characters with first and last name" required>

					</div>

				</div>

				<br>

				

				<div class="control-group">

					<div class="controls">

						<input type="number" class="form-control" name="salary" placeholder="Please Enter salary" title="Please enter salary" required>

					</div>

				</div>

				<br>

				

				<div class="control-group">

					<div class="controls">

						<input type="text" class="form-control" name="designation" pattern="[A-Za-z]{2,20}" placeholder="Please Enter Your designation" title="Name should be of min 2 characters with first and last name" required>
					</div>

				</div>

				<br>

				

				<div class="control-group">

					<div class="controls">

						<input type="text" class="form-control" name="department" pattern="[A-Za-z]{2,20}" placeholder="Please Enter Your Branch" title="Enter valid branch name" required>

					</div>

				</div>

				<br>
				<div class="control-group">

					<div class="controls">

						<input type="text" class="form-control" name="gender" pattern="[A-Za-z]{2,20}" placeholder="Please Enter Your Gender" title="Enter Gender" required>

					</div>

				</div>

				<br>

				

				<div class="form-group">

					<button class="button button-default" formaction="add" name="submitbtn" type="submit" value="ins">Insert</button>

				</div>

				

				<div class="form-group">

					<button class="button button-default" formaction="generate" name="submitbtn" type="submit" value="ins"> Search</button>

				</div>

				

				

				<div class="form-group">

					<button class="button button-default" formaction="deletes" name="submitbtn" type="submit" value="ins">DELETE</button>

				</div>

            </div>

        </form>

		</center>

    </body>

    </html>

    `;

    res.send(rr);

})





app.post('/add', urlencodedParser, function (req, res) {	

	var SSN = req.body.SSN;

	var name = req.body.name;
	var gender = req.body.gender;
	var salary = req.body.salary;

	var des = req.body.designation;

	var department = req.body.department;

	
   

    var sql = "INSERT INTO Employee values(" + SSN + ",'" +name +"','" +gender+"'," + salary + ",'"+department+"')";



    console.log(sql);

    con.query(sql, function (err, res) {

        if (err) throw err;

        console.log(SSN + " " + name + " " +gender+ " " + salary + " " + department + " " + " Inserted");

    });

	res.send("Added to the database Successfully");

    res.end();

    //res.redirect("/r");

});



app.post('/generate', urlencodedParser, function (req, res) {

	var SSN = req.body.SSN;

	var name = req.body.name;
	var gender = req.body.gender;
	var salary = parseInt(req.body.salary);

	var designation = parseFloat(req.body.designation);

	var department = req.body.department;


	


	var sql="SELECT SSN,name,department FROM Employee WHERE gender = 'female'&& department = 'production' ";


    console.log(sql);

    con.query(sql, function (err, result,fields) {

        if (err) throw err;

        //console.log(item_no +  " deleted");

		console.log(result);

		res.send(result);

		res.end();

    });


    

});



app.post('/deletes', urlencodedParser, function (req, res) {

//    var cie = parseInt(req.body.cie);

	var salary = parseInt(req.body.salary);


	var sql="delete FROM Employee WHERE salary < 500";

    console.log(sql);

    con.query(sql, function (err, res) {

        if (err) throw err;


		

    });

   

    res.send("Deleted Successfully");

    res.end();

});





app.listen(9001);