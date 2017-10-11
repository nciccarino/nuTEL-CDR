var mysql = require("mysql");

module.exports= function(app) {

	// var connection; 

	// if (process.env.JAWSDB_URL) {
	// 	connection = mysql.createConnection(process.env.JAWSDB_URL); 
	// } else {
	// 	connection = mysql.createConnection({
	//   		host: "localhost",
	//   		user: "root",
	//   		password: "",
	//   		database: "nuteldb"
	// 	});
	// }

	// connection.connect(function(err) {
	// 	if (err) throw err;
	// 	console.log("connected as id " + connection.threadId + "\n");

	// 	runTable();

	// })

	// var table;
	// var info; 

	// function runTable() {
	// 	connection.query("SELECT * FROM" + table, function(err, res) {
	// 		info = res
	// 	})

	// }

	// // app.get("/info/:table", function(req, res) {
	// // 	table = req.params.table
	// // 	res.json(info)
	// // })

}; 