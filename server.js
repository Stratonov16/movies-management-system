const { create } = require("domain");
const express = require("express");
const mysql = require("mysql");

const app = express(); // initialize an express instance called 'app'

app.use(express.json()); // set up the app to parse JSON request bodies

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// return the public/index.html file when a GET request is made to the root path "/"
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/admin/movies.html");
});


// start listening on a port 
app.listen(process.env.PORT, () => {
  console.log(`Don't worry app is listening at port ${process.env.PORT}`);
});

//db setup
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "1234567890",
//   database: "Movie_Management",
// });
// db.connect((err) => {
//   if (err) throw err;
//   else console.log("Connection Established.....");
// });


// app.get("/create_table_movie", (req, res) => {
//   let sql =
//     "CREATE TABLE Movie(id int AUTO_INCREMENT ,title VARCHAR(255),language VARCHAR(255),plot VARCHAR(255),release_date DATE,month VARCHAR(255),year int,rating int, PRIMARY KEY(id))";
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     else console.log(result);
//     res.send("Movie table created");
//   });
// });

// // format of date in mysql is YYYY-MM-DD

// app.post("/add_movie", (req, res) => {
//   console.log(req.body);
//   let movie = {
//     title: req.body.title,
//     language: req.body.language,
//     plot: req.body.plot,
//     release_date: req.body.release_date,
//     month: req.body.month,
//     year: req.body.year,
//     rating: req.body.rating,
//   };
//   let sql = "INSERT into Movie SET ?";
//   let query = db.query(sql, movie, (err, res) => {
//     if (err) console.log(err);
//     else console.log("Movie added");
//   });
// });


// app.post("/delete_movie", (req, res) => {
//   console.log(req.body);
//   let movie = {
//     title: req.body.title,
//   };
//   let sql = "DELETE from Movie where ?";
//   let query = db.query(sql, movie, (err, res) => {
//     if (err) console.log(err);
//     else console.log("Movie deleted");
//   });
// });


