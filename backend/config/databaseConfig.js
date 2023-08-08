var mysql = require('mysql2');

//local Host Db
config = {
	connectionLimit: 5,
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'Powergrid',
	multipleStatements: true,
};

var connection = mysql.createConnection(config);
connection.connect(function (err) {
	if (err) {
		console.log('error connecting:' + err.stack);
	}
	else {
		console.log('connected successfully to DB.');
	}
});
module.exports = {
	connection: mysql.createConnection(config),
};