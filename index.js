const express = require('express'); //Allows for use of express
const cors= require('cors'); //Allows for use of Cors
const mysql = require('mysql'); //Allows for user of MySQL
const bodyParser = require('body-parser') //Allows for use of body-parser
const nodemailer = require('nodemailer') //Allows for use of nodemailer
const { check, validationResult } = require('express-validator/check'); //Allows for use of express-validtor/check

const app = express(); // Initializes express into variable
const con = mysql.createConnection({
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
    let jobsql = "CREATE TABLE IF NOT EXISTS Job (JobID INT NOT NULL AUTO_INCREMENT, AdminID INT NOT NULL, Position VARCHAR(255) NOT NULL, Status BOOLEAN, Description VARCHAR(255) NOT NULL,PostDate DATE, CloseDate DATE,JobFieldList VARCHAR(255), PRIMARY KEY(JobID), FOREIGN KEY (AdminID) REFERENCES Admin(AdminID))";
    let applicationsql = "CREATE TABLE IF NOT EXISTS Application (UserFK INT NOT NULL, JobFK INT NOT NULL , Status VARCHAR(255) NOT NULL,SupportingDocumentList VARCHAR(255), PRIMARY KEY(UserFK, JobFK), FOREIGN KEY(UserFK) REFERENCES User(UserID), FOREIGN KEY(JobFK) REFERENCES Job(JobID))";

// code to drop tables and redefine them

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

// GET 
// Params: 
// Desc: Returns 'Hello World!'
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// GET 
// Params: 
// Desc: Returns all courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// GET 
// Params: id
// Desc: Returns the course with the given ID from the parameter
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) res.status(404).send('The course with the given id was not found') //404
    res.send(course);
});

// GET 
// Params: 
// Desc: Returns the name of an identified user
app.get('/api/name', (req, res) =>{
    id = req.body.UserID;
    name="";
    queryStatement = "SELECT CONCAT(FirstName , ' ', MiddleName, ' ' , LastName) AS Name FROM User WHERE UserID = " + id;
    con.query(queryStatement, function (err, result){
      if (err) console.log("Error!!!!! 3");
      else res.send(result[0]);
      console.log(result[0]);
    });
   
});

// GET 
// Params: 
// Desc: Returns the address of a specified user
app.get('/api/addr', (req, res) =>{
    id = req.body.UserID;
    queryStatement = "SELECT Address FROM User WHERE UserID = " + id;
    con.query(queryStatement, function (err, result){
      if (err) console.log("Error!!!!! 5");
      else res.send(result[0]);
    });

});

// GET 
// Params: 
// Desc: Returns the email of a specified user
app.get('/api/email', (req, res) =>{
    id = req.body.UserID;
    queryStatement = "SELECT Email FROM User WHERE UserID = " + id;
    con.query(queryStatement, function (err, result){
      if (err) console.log("Error!!!!! 6");
      else res.send(result[0]);
    });

});

// GET 
// Params: 
// Desc: Returns the phone contact for a specified user
app.get('/api/number', (req, res) =>{
    id = req.body.UserID;
    queryStatement = "SELECT PhoneContact FROM User WHERE UserID=" + id;
    con.query(queryStatement, function (err, result){
      if (err) console.log("Error!!!!! 7");
      else res.send(result[0]);
    });

});

// GET 
// Params: 
// Desc: Returns the photo from a specified user
app.get('/api/photo', (req, res) =>{
    id = req.body.UserID;
    queryStatement = "SELECT Image FROM User WHERE UserID = "+ id;
    con.query(queryStatement, function (err, result){
      if (err) console.log("Error!!!!! 8");
      else res.send(result[0]);
    });

});


// GET 
// Params: 
// Desc: Returns
app.get('/api/admin/metrics', (req, res) =>{
    let id = req.body.adminID;
});

// GET 
// Params: 
// Desc: Returns the db record information for an admin
app.get('/api/adminprofile', (req, res) =>{
    let id = req.body.adminID;
    queryStatement = "SELECT Organization, PhoneContact, Email,  FROM User WHERE AdminID=" + id;
    con.query(queryStatement, function (err, result){
      if (err) console.log("Error!!!!! 8");
      else res.send(result[0]);
    });

});

// POST
// Params: 
// Desc: Receives login information and attempts to verify the identity of the user
app.post('/api/login', function(req, res){
    let lEmail = req.body.email;
    let lPassword = req.body.password;  
    
    loginQuery = "SELECT UserID, Password FROM User WHERE Email = '" + lEmail + "'" ;
    con.query(loginQuery, function (err, result){
      if (err) console.log(err);
        else {
           console.log(result);
           if(result[0].Password!==lPassword){
               return res.send(null);
               //console.log("Failed Login");
           }else {console.log("Successful Login");
	    
            res.send(result[0].UserID);
           }
        }
      });
    //redirect
});

// GET 
// Params: 
// Desc: Returns
app.post('/api/adminSignup', function(req,res){
    let email = req.body.email;
    let password = req.body.password;
    let v_email = req.body.v_email;
    let phone = req.body.phoneNumber;
    let admin = req.body.ministry;
    
    if (email === v_email){
        uniqueEmail = "SELECT * FROM User WHERE Email =' " + email + "'";
        con.query(uniqueEmail, function (err, result){
          if (err) console.log(err);
          else console.log("DB check was successful");
          console.log(result);
        });
        if(result.length!==1){
		emailv = 'TRUE';
		insert = "INSERT INTO Admin(Organization, PhoneContact, Email, EmailVerified, Password) VALUES('" + admin + "', '" + phone + "', '" + email + "', " + emailv + ", '" + password+"')";
		con.query(insert, function (err, result){
		  if (err) console.log(err);
		  else {console.log("insert Successful");
		res.send('/admin/profile');
		}
		});
	}else{ res.send("Email Already Exists");}
    }else{res.send("Emails do not match");}
});

// POST
// Params: 
// Desc: Captures data from body and inserts a new job in the database
app.post('/api/admin/createjob', (req, res) => {

  getLastRecord = 'SELECT JobID FROM Job ORDER BY JobID DESC LIMIT 1'

  let lastID = -1;

  con.query(getLastRecord, (err, result) => {
    if (err){
      console.log("Could not get last job!");
      return;
    }else{
      if(Number.isInteger(result)){
        console.log("Yah");
      }else{
        console.log("Nah");
        console.log(result);
        return;
      }
      console.log("Successfully retrived last job with id " + result);
      let lastID = result;
    }
  })

  let jobID = lastID;
  let adminID = req.body.adminID;
  let title = req.body.title;
  let cat = req.body.cat;
  let min = req.body.min;
  
  let today = new Date();
  let dd = today.getDate();

  let mm = today.getMonth()+1; 
  let yyyy = today.getFullYear();
  if(dd<10) 
  {
      dd='0'+dd;
  } 

  if(mm<10) 
  {
      mm='0'+mm;
  }
  today = yyyy+'-'+mm+'-'+dd;
  console.log(today);

  let closeDate = req.body.closeDate;
  // let des = req.body.des;
  // let jobLoc = req.body.jobLoc;
  // let jobType = req.body.jobType;
  // let exp = req.body.exp;
  // let edu = req.body.edu;
  // let essSkills = req.body.essSkills;
  // let salRange = req.body.salRange;

  let newJob = {
    "jobID": jobID,
    "title": title,
    "cat": cat,
    "min": min,
    "closeDate": closeDate
    // "des": des,
    // "jobLoc": jobLoc,
    // "jobType": jobType,
    // "exp": exp,
    // "edu": edu,
    // "essSkills": essSkills,
    // "salRange": salRange
  }

  insertJob = "INSERT INTO Job (AdminID, Position, Status, Description, PostDate, CloseDate, JobFieldList) VALUES ( " +
    adminID + ", '" +
    title + "', " +
    1 + ", '" +
    'Interesing Description' + "', '" +
    today + "', '" +
    closeDate + "', '" +
    'Sample Data' + "' )";

  console.log(insertJob);
  
  con.query(insertJob, (err, result) => {

    if (err){
      console.log("Could not insert new job into Job table");
      console.log(err)
    }else{
      console.log("Successfully inserted new job with id " + lastID + 1);
    }
  })

  res.send(newJob);
});

// POST
// Params: 
// Desc: 
app.post('/api/signup', function(req, res){
    let email = req.body.email;
    let password = req.body.password;  
    let fname = req.body.fname;
    let mName = req.body.mname;
    let lName = req.body.lname;
    let v_email = req.body.v_email;
    let dob = req.body.dob;
    console.log("req.body= " + req.body);
    //let arr = name.split("/");
    if (email === v_email){
        uniqueEmail = "SELECT * FROM User WHERE Email =' " + email + "'";
        con.query(uniqueEmail, function (err, result){
            if (err) console.log(err);
            else console.log("DB check was successful");
            console.log(result);
        });
        console.log.dob;
        if (result.length!==1){
		insert = "INSERT INTO User (FirstName, MiddleName, LastName, DateOfBirth, Email, Password) VALUES ('"+ fname+"', '"+ mName + "', '" +lName+ "', '" + dob +"', '" +email + "','" + password + "')";
		//});
		con.query(insert, function (err, result){
		  if (err) console.log(err);
		  else console.log("insert Successful");
		});
	   

		let transporter = nodemailer.createTransport({
		  service: 'gmail',
		  auth: {
		    user: 'royalflush.hacktt@gmail.com',
		    pass: 'jobsttdash'
		  }
		});
		//email = "'" + email + "'"
		let mailOptions = {
		  from: 'royalflush.hacktt@gmail.com@gmail.com',
		  to: email,
		  subject: 'Welcome to EmployTT!',
		  text: 'Verify Me'
		};

		transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
		    console.log(error);
		  } else {
		    console.log('Email sent: ' + info.response);
		  }
		});
        }else{res.send("Email Already Exists!")}
    }else{res.send("Emails do not match.")}

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

// GET 
// Params: id
// Desc: Returns an admin's information based on the id
app.get('/api/admin/:id', (req, res) => {

  adminIdQuery = "SELECT * FROM Admin WHERE AdminId=" + req.params.id;
  
  con.query(adminIdQuery, function(err, result){
    if (err){
      console.log("Eror getting admin with ID:" + req.params.id);
    }else{
      console.log("Select successful.");
      console.log(result);

      res.send(result);
    }
  });
})

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
