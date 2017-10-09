// use mysql npm package 

//create functions as a modular.exports

// var mysql = require("mysql");
// var inquirer = require("inquirer");

// var connection = mysql.createConnection({
//   host: "localhost",
//   port: 3306,

//   // Your username
//   user: "root",

//   // Your password
//   password: "",
//   database: "top_songsDB"
// });

// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("connected as id " + connection.threadId + "\n");
  
//   runSearch();

// });

//-------------------------------------OR -----------------------------------------------

//doing something like db.findAll or something might work because the connection is established in the index.js model

//db.query("SELECT randomShit FROM whateverthefuck GROUP BY idontcare")