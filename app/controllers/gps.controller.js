
const Gps = require('../models/gps.model.js');

// Create and Save a new Gps
exports.create = (req, res) => {
 // Validate request
	if(!req.body.MysqlId) {
		return res.status(400).send({
			message: "Gps MysqlId can not be empty"
		});
	}

	// Create a Gps
	const gps = new Gps({
		MysqlId: req.body.MysqlId || "Untitled Gps", 
		pseudo: req.body.pseudo,
		coordinates: req.body.coordinates,
		avatar:req.body.avatar
	});

	// Save Gps in the database
	gps.save()
	.then(data => {
		res.send(data);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Some error occurred while creating the Gps."
		});
	});
};

// Retrieve and return all gpss from the database.
exports.findAll = (req, res) => {
Gps.find()
	.then(gpss => {
		res.send(gpss);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Some error occurred while retrieving gpss."
		});
	});
};

// Find a single gps with a gpsId
exports.findOnebyId = (req, res) => {
 Gps.find({MysqlId:req.params.MysqlId},function(err,gps){
            if (err){
                res.send(err);
			}
            res.json(gps);
        });
}

// Find gps position for one user (pseudo minuscule)
exports.findOneUser=(req, res) => {
 Gps.find({pseudo:{ $regex: new RegExp("^" + req.params.pseudo.toLowerCase(), "i") }},function(err,gps){
            if (err)
                res.send(err);
            res.json(gps);
        });
}

// Update a gps identified by the gpsId in the request
exports.updateMysql = (req, res) => {
	// Find gps and update it with the request body
	Gps.findOneAndUpdate({MysqlId:req.params.MysqlId}, {
		MysqlId: req.body.MysqlId, 
		pseudo: req.body.pseudo,
		coordinates: req.body.coordinates,
		avatar:req.body.avatar
		
	}, {new: true})
	.then(gps => {
		if(!gps) {
			return res.status(404).send({
				message: "Gps not found with id " + req.params.MysqlId
			});
		}
		res.send(gps);
	}).catch(err => {
		if(err.kind === 'ObjectId') {
			return res.status(404).send({
				message: "Gps not found with id " + req.params.MysqlId
			});                
		}
		return res.status(500).send({
			message: "Error updating gps with id " + req.params.MysqlId
		});
	});
};
// Update a gps identified by the gpsId in the request
exports.updateMongoId = (req, res) => {
	// Find gps and update it with the request body
	Gps.findByIdAndUpdate(req.params.id, {
		MysqlId: req.body.MysqlId, 
		pseudo: req.body.pseudo,
		coordinates: req.body.coordinates,
		avatar:req.body.avatar
		
	}, {new: true})
	.then(gps => {
		if(!gps) {
			return res.status(404).send({
				message: "Gps not found with id " + req.params.id
			});
		}
		res.send(gps);
	}).catch(err => {
		if(err.kind === 'ObjectId') {
			return res.status(404).send({
				message: "Gps not found with id " + req.params.id
			});                
		}
		return res.status(500).send({
			message: "Error updating gps with id " + req.params.id
		});
	});
};


// Delete a gps with the specified MysqlID in the request
exports.deleteMysqlId = (req, res) => {
	
Gps.findOneAndDelete({MysqlId:req.params.MysqlId})
	.then(gps => {
		if(!gps) {
			return res.status(404).send({
				message: "Gps not found with id " + req.params.MysqlId
			});
		}
		res.send({message: "Mysql id log Gps deleted successfully!"});
	}).catch(err => {
		if(err.kind === 'ObjectId' || err.name === 'NotFound') {
			return res.status(404).send({
				message: "Mysql id log Gps not found with id " + req.params.MysqlId
			});                
		}
		return res.status(500).send({
			message: "Could not delete Mysql id log gps with id " + req.params.MysqlId
		});
	});
};
// Delete a gps with the specified MongoID in the request
exports.deleteMongoId = (req, res) => {
Gps.findByIdAndRemove(req.params.id)
	.then(gps => {
		if(!gps) {
			return res.status(404).send({
				message: "Gps not found with id " + req.params.gpsId
			});
		}
		res.send({message: "Gps deleted successfully2!"});
	}).catch(err => {
		if(err.kind === 'ObjectId' || err.name === 'NotFound') {
			return res.status(404).send({
				message: "Gps not found with id " + req.params.gpsId
			});                
		}
		return res.status(500).send({
			message: "Could not delete gps with id " + req.params.gpsId
		});
	});
};