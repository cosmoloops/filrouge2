module.exports = (app) => {
	const rdv = require('../controllers/rdv.controller.js');
//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------
//POST create

	// Create une nouvelle reunion
	app.post('/rdv/create', rdv.create);
//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------
//GET Select: 

	// Retrieve all Gps position
	app.get('/rdv/select/all', rdv.findAll);

	// Retrieve a single rdv posistion with mysqlid
	//app.get('/rdv/select/mysql/id/:MysqlId', rdv.findOnebyId);
	
	// Retrieve a single rdv posistion with titre
	app.get('/rdv/select/titre/:titre', rdv.findOneRdvtitre);
	// Retrieve a single rdv posistion with clé
	app.get('/rdv/select/cle/:cle', rdv.findOneRdvkey);	
	
//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------
// PUT UPDATE : 
	
	// Update a Note with cle
	app.put('/rdv/update/cle/:cle', rdv.updateCle);
	// Update a Note with MongoDb id
	app.put('/rdv/update/id/:id', rdv.updateMongoID);
	
	
//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------
// DELETE :
	// Delete a rdv with cle
	app.delete('/rdv/delete/cle/:cle', rdv.deleteCle);
	
	// Delete a Note with MongoID
	app.delete('/rdv/delete/id/:id', rdv.deleteMongoId);
//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------
// DROP DATABASE :
	app.delete('/rdv/delete/drop', rdv.drop);

	
}