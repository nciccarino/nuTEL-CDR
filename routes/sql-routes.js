var mysql = require("mysql");

var connection; 

if (process.env.JAWSDB_URL) {
	connection = mysql.createConnection(process.env.JAWSDB_URL); 
} else {
	connection = mysql.createConnection({
  		host: "localhost",
  		user: "root",
  		password: "",
  		database: "nuteldb"
	});
}

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

module.exports= function(app) {

	app.get("/info/:table", function(req, res) {
		connection.query("SELECT * FROM" + req.params.table, function(err, res) {
			res.json(data); 
		})
	})

}; 