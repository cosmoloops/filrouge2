const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

// create express app
const app = express();
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
// Configuring the database
				const dbConfig = require('./config/database.config.js');
				const mongoose = require('mongoose');
				
				mongoose.Promise = global.Promise;
				
				// Connecting to the database
				mongoose.connect(dbConfig.url, {
					useNewUrlParser: true
				}).then(() => {
					console.log("Successfully connected to the database");    
				}).catch(err => {
					console.log('Could not connect to the database. Exiting now...', err);
					process.exit();
				});

// define a simple route
app.get('/', (req, res) => {
	res.json({"message": "Gestionnaire de positions gps des utilisateurs "});
});
// Require routes
require('./app/routes/gps.routes.js')(app);
	require('./app/routes/rdv.routes.js')(app);
	
// listen for requests
app.listen(8082, () => {
	console.log("Server is listening on port 8082");
});