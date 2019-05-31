const express = require('express');
const cors= require('cors');
const app = express();
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')

const { check, validationResult } = require('express-validator/check');

var mysql = require('mysql');
var con = mysql.createConnection({
    host: "ed1swbucn606iaz.cmdzaigiudxs.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "password123",
    database: "users"
});

con.connect(function(err) {
  if (err) console.log(" 1");
  else{
    console.log("Connected!");
    let usersql = "CREATE TABLE IF NOT EXISTS User (UserID INT NOT NULL AUTO_INCREMENT, FirstName VARCHAR(255) NOT NULL, MiddleName VARCHAR(255), LastName VARCHAR(255) NOT NULL, DateOfBirth DATE, PhoneContact VARCHAR(255), Email VARCHAR(255) NOT NULL, EmailVerified BOOLEAN, Address VARCHAR(255), Password VARCHAR(255) NOT NULL, Resume VARCHAR(255), Image VARCHAR(255),PreferenceList VARCHAR(255),  LinkedInAccount VARCHAR(255), SocialMedia VARCHAR(255), PRIMARY KEY(UserID))";
    let adminsql = "CREATE TABLE IF NOT EXISTS Admin (AdminID INT NOT NULL AUTO_INCREMENT, Organization VARCHAR(255) NOT NULL, PhoneContact VARCHAR(255), Email VARCHAR(255) NOT NULL, EmailVerified BOOLEAN, Password VARCHAR(255) NOT NULL, PRIMARY KEY(AdminID))";
    let jobsql = "CREATE TABLE IF NOT EXISTS Job (JobID INT NOT NULL AUTO_INCREMENT, AdminID INT NOT NULL, Status BOOLEAN, Description VARCHAR(255) NOT NULL,PostDate DATE, CloseDate DATE,JobFieldList VARCHAR(255), PRIMARY KEY(JobID), FOREIGN KEY (AdminID) REFERENCES Admin(AdminID))";
    let applicationsql = "CREATE TABLE IF NOT EXISTS Application (UserFK INT NOT NULL, JobFK INT NOT NULL , Status VARCHAR(255) NOT NULL,SupportingDocumentList VARCHAR(255), PRIMARY KEY(UserFK, JobFK), FOREIGN KEY(UserFK) REFERENCES User(UserID), FOREIGN KEY(JobFK) REFERENCES Job(JobID))";

// code to drop tables and redefine them
//
/*
    let dropapsql = "DROP TABLE IF EXISTS Application";
    let dropusql = "DROP TABLE IF EXISTS User";
    let dropjsql = "DROP TABLE IF EXISTS Job";
    let dropadsql = "DROP TABLE IF EXISTS Admin";
    con.query(dropapsql, function (err, result) {
      if (err) throw err;
   else{console.log("Application Table Dropped");}
    });
    con.query(dropusql, function (err, result) {
      if (err) throw err;
   else{console.log("User Table dropped");}
    });
    con.query(dropjsql, function (err, result) {
      if (err) throw err;
   else{console.log("Job Table dropped");}
    });
    con.query(dropadsql, function (err, result) {
      if (err) throw err;
   else{console.log("Admin Table dropped");}
    });

*/
//attempt to create the tables
    con.query(usersql, function (err, result) {
      if (err) throw err;
   else{console.log("User Table created");}
    });
    con.query(adminsql, function (err, result) {
      if (err) throw err;
   else{console.log("Admin Table created");}
    });
    con.query(jobsql, function (err, result) {
      if (err) throw err;
   else{console.log("Job Table created");}
    });
      con.query(applicationsql, function (err, result) {
      if (err) throw err;
     else{console.log("Application Table created");}
    });

  }
});



app.use(express.json());
app.use(express.urlencoded());
app.use(cors())
const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'},
];

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) res.status(404).send('The course with the given id was not found') //404
    res.send(course);
});

app.get('/api/name', (req, res) =>{
    name="";
    queryStatement = "SELECT CONCAT(FirstName , ' ', MiddleName, ' ' , LastName) AS Name FROM User WHERE UserID=1";
    con.query(queryStatement, function (err, result){
      if (err) console.log("Error!!!!! 3");
      else res.send(result[0]);
      console.log(result[0]);
    });
   
});

app.get('/api/addr', (req, res) =>{
    queryStatement = "SELECT Address FROM User WHERE UserID=1";
    con.query(queryStatement, function (err, result){
      if (err) console.log("Error!!!!! 5");
      else res.send(result[0]);
    });

});

app.get('/api/email', (req, res) =>{
    queryStatement = "SELECT Email FROM User WHERE UserID=1";
    con.query(queryStatement, function (err, result){
      if (err) console.log("Error!!!!! 6");
      else res.send(result[0]);
    });

});

app.get('/api/number', (req, res) =>{
    id = 1;
    queryStatement = "SELECT PhoneContact FROM User WHERE UserID=" + id;
    con.query(queryStatement, function (err, result){
      if (err) console.log("Error!!!!! 7");
      else res.send(result[0]);
    });

});

app.get('/api/photo', (req, res) =>{
    queryStatement = "SELECT Image FROM User WHERE UserID=1";
    con.query(queryStatement, function (err, result){
      if (err) console.log("Error!!!!! 8");
      else res.send(result[0]);
    });

});

app.post('/api/login', function(req, res){
    let lEmail = req.body.email;
    let lPassword = req.body.password;  
    
    loginQuery = "SELECT Password FROM User WHERE Email = '" + lEmail + "'" ;
    con.query(loginQuery, function (err, result){
      if (err) console.log(err);
        else {
           console.log(result);
           if(result!==lPassword){
               return res.send("Failed Login");
               console.log("Failed Login");
           }else res.redirect("");
        }
      });
    //redirect
});

app.post('/api/createjob', function(req,res){
    
    
});



app.post('/api/signup', function(req, res){
    let email = req.body.email;
    let password = req.body.password;  
    let fname = req.body.fname;
    let mName = req.body.mname;
    let lName = req.body.lname;
    let v_email = req.body.v_email;
    let dob = req.body.dob;
    let arr = name.split("/");
    if (email === v_email){
        uniqueEmail = "SELECT * FROM User WHERE Email =' " + email + "'";
        con.query(uniqueEmail, function (err, result){
          if (err) console.log(err);
          else console.log("DB check was successful");
        console.log(result);
        });
        insert = "INSERT INTO User (FirstName,MiddleName, LastName, DateOfBirth, Email, Password) VALUES ('"+ fname+"', '"+ MiddleName + "'" +lname+ "', STR_TO_DATE(" + dob +"','%d/%m/%Y'), '" +email + "','" + password + "')";
        //});
        con.query(insert, function (err, result){
          if (err) console.log(err);
          else console.log("DB check was successful");
        });
   }else{res.send("Emails do not match")}

    
	let transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
	    user: 'email@gmail.com',
	    pass: 'yourpassword'
	  }
	});
	email = "'" + email + "'"
	let mailOptions = {
	  from: 'email@gmail.com',
	  to: email,
	  subject: 'Sending Email using Node.js',
	  text: 'Verify Me'
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	  }
	});  

});

app.post('/api/pupdate', function(req, res){
    let name = req.body.Name;
    let email = req.body.Email;
    let addr = req.body.Address;
    let phone = req.body.PhoneContact;
    let id = "1";
    let arr = name.split(" ");
    if(name!=="" && email!==""){
    if (arr.length===1){
        updateSQL = "UPDATE User SET FirstName = '"+ name+ "', Email = '" +email + "', Address = '"+ addr +"', PhoneContact = '" + phone + "' WHERE UserID = " + id + ";";
    }
    else if(arr.length===2){
        updateSQL = "UPDATE User SET FirstName = '"+ arr[0] + "', LastName='" + arr[1] + "', Email = '" +email + "', Address = '"+ addr +"', PhoneContact = '" + phone + "' WHERE UserID = " + id + ";";
    }
    else {
        name=arr[1];
        for(i=2;i<arr.length-1;i++){
            name = name + " " + arr[i];
        }
        updateSQL = "UPDATE User SET FirstName = '"+ arr[0] + "', MiddleName = '"+ name+ "', LastName ='" + arr[arr.length-1] + "', Email = '" +email + "', Address = '"+ addr +"', PhoneContact = '" + phone + "' WHERE UserID = " + id + ";";
    }
        con.query(updateSQL, function (err, result){
          if (err) console.log(err);
          else console.log("Profile update successful");
        });
    }
});


app.post('/api/courses', [check('name').isLength({min: 3})], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //400 Bad Request
        //res.status(422).send('Name is required and should be minimum 3 characters');
        return res.status(422).json({ errors: errors.array() });
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

//PORT
const port = process.env.PORT || 80;
app.listen(port, () => console.log(`Listening on port ${port}...`));
