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
    database: "examination"
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
		<h1>Examination Details</h1>
        
        <form method='post' action='/'>
            <div class="col-md-4" style="padding-top: 10px;">
				
				<div class="control-group">
					<div class="controls">
						<input type="text" class="form-control" name="USN" pattern="[A-Za-z0-9]{2,10}" placeholder="Please Enter USN" title="Please enter valid USN" required>
					</div>
				</div>
				<br>
				
				<div class="control-group">
					<div class="controls">
						<input type="text" class="form-control" name="name" pattern="[A-Za-z]{2,20} [A-Za-z]{0,20}" placeholder="Please Enter Your Name" title="Name should be of min 2 characters with first and last name" required>
					</div>
				</div>
				<br>
				
				<div class="control-group">
					<div class="controls">
						<input type="number" class="form-control" name="attendance" placeholder="Please Enter Attendance in percentage" title="Please enter attendance" required>
					</div>
				</div>
				<br>
				
				<div class="control-group">
					<div class="controls">
						<input type="number" class="form-control" name="cie" pattern="[0-9]{1,2}" placeholder="Please Enter Your CIE" max="10" title="Enter valid cie" required>
					</div>
				</div>
				<br>
				
				<div class="control-group">
					<div class="controls">
						<input type="text" class="form-control" name="branch" pattern="[A-Za-z]{2,20} [A-Za-z]{0,20}" placeholder="Please Enter Your Branch" title="Enter valid branch name" required>
					</div>
				</div>
				<br>
				
				<div class="form-group">
					<button class="button button-default" formaction="add" name="submitbtn" type="submit" value="ins">Enroll</button>
				</div>
				
				<div class="form-group">
					<button class="button button-default" formaction="generate" name="submitbtn" type="submit" value="ins">GENERATE HALL TICKET</button>
				</div>
					
				<div class="form-group">
					<button class="button button-default" formaction="students" name="submitbtn" type="submit" value="ins">ELIGIBLE STUDENTS</button>
				</div>
				
				<div class="form-group">
					<button class="button button-default" formaction="deletes" name="submitbtn" type="submit" value="ins">DELETE NON-ELIGIBLESTUDENTS</button>
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
	var USN = req.body.USN;
	var name = req.body.name;
	var attendance = parseInt(req.body.attendance);
	var cie = parseFloat(req.body.cie);
	var branch = req.body.branch;
   
    var sql = "INSERT INTO details values('" + USN + "','" +name +"'," + attendance + ","+cie+",'"+branch+"');";

    console.log(sql);
    con.query(sql, function (err, res) {
        if (err) throw err;
        console.log(USN + " " + name + " " + attendance + " " + cie + " " + branch + " " + " Inserted");
    });
	res.send("Added to the database Successfully");
    res.end();
    //res.redirect("/r");
});

app.post('/generate', urlencodedParser, function (req, res) {
    var USN = req.body.USN;
	var name = req.body.name;
	var attendance = parseInt(req.body.attendance);
	var cie = parseFloat(req.body.cie);
	var branch = req.body.branch;
	
	//var sql = "UPDATE shop b SET b.bill = b.bill+'"+price+"' WHERE b.itemno="+itemno;
	var sql="SELECT USN,name,branch FROM details WHERE cie>=8 AND attendance>80";
	//var sql="SELECT *FROM details WHERE cie>=8 AND attendance>80";
    console.log(sql);
    con.query(sql, function (err, result,fields) {
        if (err) throw err;
        //console.log(item_no +  " deleted");
		console.log(result);
		res.send(result);
		res.end();
    });
    //res.send("Hall ticket is generated");
    
});
app.post('/students', urlencodedParser, function (req, res) {
    var USN = req.body.USN;
	var name = req.body.name;
	var attendance = parseInt(req.body.attendance);
	var cie = parseFloat(req.body.cie);
	var branch = req.body.branch;
	
	//var sql = "UPDATE shop b SET b.bill = b.bill+'"+price+"' WHERE b.itemno="+itemno;
	var sql="SELECT USN,name,branch FROM details WHERE cie>=8 AND attendance>80";
	//var sql="SELECT *FROM details WHERE cie>=8 AND attendance>80";
    console.log(sql);
    con.query(sql, function (err, result,fields) {
        if (err) throw err;
        //console.log(item_no +  " deleted");
		console.log(result);
		res.send(result);
		res.end();
    });
    //res.send("Hall ticket is generated");
    
});

app.post('/deletes', urlencodedParser, function (req, res) {
    var cie = parseInt(req.body.cie);
	var attendance = parseInt(req.body.attendance);
    //var sql = "delete *from details where cie="+item_no+"";
	var sql="delete FROM details WHERE cie<8 AND attendance<80";
    console.log(sql);
    con.query(sql, function (err, res) {
        if (err) throw err;
        //console.log(item_no +  " deleted");
		
    });
   
    res.send("Deleted Successfully");
    res.end();
});


app.listen(9001);