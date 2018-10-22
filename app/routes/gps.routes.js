module.exports = (app) => {
	const gps = require('../controllers/gps.controller.js');

	//----------------------------------------------------------------------------------------------------
	//----------------------------------------------------------------------------------------------------
	//POST create

	// Create a new Gps position
	app.post('/gps/create', gps.create);

	//----------------------------------------------------------------------------------------------------
	//----------------------------------------------------------------------------------------------------
	//GET Select: 
	// Retrieve all Gps position
	app.get('/gps/select/all', gps.findAll);
	// Retrieve all Gps position
	app.get('/gps/select/all/last', gps.findAllLast);

	// Retrieve a single gps posistion with mysqlid
	app.get('/gps/select/mysql/id/:MysqlId', gps.findOnebyId);

	// Retrieve a single gps posistion with mysqlid
	app.get('/gps/select/mysql/id/last/:MysqlId', gps.findOnebyIdLast);

	// Retrieve a single gps posistion with pseudo
	app.get('/gps/select/pseudo/:pseudo', gps.findOneUser);

	//----------------------------------------------------------------------------------------------------
	//----------------------------------------------------------------------------------------------------
	// PUT UPDATE : 


	// Update a Note with MongobdID
	app.put('/gps/update/mysql/id/:MysqlId', gps.updateMysql);

	// Update a Note with MongobdID
	app.put('/gps/update/id/:id', gps.updateMongoId);
	//----------------------------------------------------------------------------------------------------
	//----------------------------------------------------------------------------------------------------
	// DELETE :	
	// Delete a Note with MysqlId
	app.delete('/gps/delete/mysql/id/:MysqlId', gps.deleteMysqlId);

	// Delete a Note with MongoID
	app.delete('/gps/delete/id/:id', gps.deleteMongoId);

	// Update a Note with pseudo
	//app.put('/gps/update/pseudo/:pseudo', gps.update);
//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------
// DROP DATABASE :
app.delete('/gps/delete/drop', gps.drop);

	

}