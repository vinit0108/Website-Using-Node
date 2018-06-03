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
    database: "bus"
});

app.get('/r', function (req, res) {
    var rr = `
    <html>

    <head>
        <title>Bus Ticket</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossorigin="anonymous">
    </head>

		<h2>Bus-Ticket Booking</h2>
	<br>
    <body align="center">
        
       <form method='post' action='/'>
            <div class="col-md-4" style="padding-top: 10px;">
                <div class="form-group">
					Ticket Number: <br>
                    <input type="number" class="form-control" name="ticketno" placeholder="Ticket Number" required />
                </div>
                <div class="form-group">
					Passenger Name: <br>
                    <input type="text" class="form-control" name="name" placeholder="Name"  required/>
                </div>
				<div class="form-group">
				Source City: <br>
                    <select name="source" style="width: 320px;">
						<option value="hubli">Hubli</option>
						<option value="bangalore">Bangalore</option>
						<option value="dharwad">Dharwad</option>
						<option value="belgaum">Belgaum</option>
						<option value="mysore">Mysore</option>
						<option value="bellary">Bellary</option>
					</select>
                </div>     
				<div class="form-group">
				Destinaton City: <br>
                    <select name="destn" style="width: 320px;">
						<option value="pune">Pune</option>
						<option value="mumbai">Mumbai</option>
						<option value="delhi">Delhi</option>
						<option value="hyderabad">Hyderabad</option>
						<option value="panaji">Panaji</option>
						<option value="surat">Surat</option>
					</select>
                </div> 
                <div class="form-group">
				Date of Booking: <br>
                    <input type="DATE" class="form-control" name="date1" placeholder="Date" />
                </div>   
				               <div class="form-group">
							   Age: <br>
                    <input type="number" class="form-control" name="age" placeholder="Age"  />
                </div>
                
        

                
                <div class="form-group">
                    <button class="button button-default" formaction="AddtoDb" name="submitbtn"style="width: 320px;" type="submit" value="ins">Book Ticket</button>
                   
                </div>
				<div class="form-group">
                    <button class="button button-default" formaction="deltoDb" name="submitbtn"style="width: 320px;" type="submit" value="ins">Cancel Ticket</button>
                   
                </div>
            </div>
        </form>
    </body>
    </html>
    `;
    res.send(rr);
})

app.post('/AddtoDb', urlencodedParser, function (req, res) {
    var ticketno = parseInt(req.body.ticketno);
    var name = req.body.name;
	var source=req.body.source;
	var destn=req.body.destn;
    var date1 = req.body.date1;
    var age = parseInt(req.body.age);
    //var balance = parseFloat(req.body.balance);
	if(ticketno!='' && name!=''){
    var sql = "INSERT INTO bus values(" + ticketno + ",'" +name +"','" + source +"','" + destn + "','" +date1 +"','" + age + "');";
	}
	else{console.log("Enter in database entry");}
    console.log(sql);
    con.query(sql, function (err, res) {
        if (err) throw err

        console.log(ticketno + " " + name + " " + source +" " + destn +" "+ date1 + " " + age +  " Inserted");

    });
    //res.redirect("/r");

   res.end();
});
app.post('/deltoDb', urlencodedParser, function (req, res) {
    var ticket_no = parseInt(req.body.ticketno);
    
    //var balance = parseFloat(req.body.balance);

    var sql = "delete from bus where ticketno="+ticket_no+"";
    console.log(sql);
    con.query(sql, function (err, res) {
        if (err) throw err;
        console.log(ticket_no +  " deleted");
    });
    //res.redirect("/r");
    res.send("CANCELLED Successfully");
    res.end();
});
app.listen(9000);