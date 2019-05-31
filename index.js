const express = require('express');
const cors= require('cors');
const app = express();
const bodyParser = require('body-parser')

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
/*
    let fname = "rachel";
    let lname = "peters";
    let email = "rachelwannpeters@gmail.com";
    let password = "password123";
    let queryStatement = "INSERT INTO User (FirstName, LastName, Email, Password) VALUES ('"+ fname+"', '"+lname+"','"+email+"','"+password+"')";

    con.query(queryStatement, function (err, result){
      if (err) console.log(err);
      else console.log("1 record inserted");
    });
*/
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
    queryStatement = "SELECT CONCAT(FirstName , ' ' , LastName) AS Name FROM User WHERE UserID=1";
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
    queryStatement = "SELECT PhoneContact FROM User WHERE UserID=1";
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

app.post('/api/pupdate', function(req, res){
    let name = req.body.Name;
    let email = req.body.Email;
    let addr = req.body.Address;
    let phone = req.body.PhoneContact;
    let id = "1";

    //console.log("name" + name +" email" + email);
    updateSQL = "UPDATE User SET FirstName = '"+ name+ "', Email = '" +email + "', Address = '"+ addr +"', PhoneContact = '" + phone + "' WHERE UserID = " + id + ";";
    con.query(updateSQL, function (err, result){
      if (err) console.log(err);
      else res.send(result[0]);
    });
    //req.send();
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
