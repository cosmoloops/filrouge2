const Rdv = require('../models/rdv.model.js');
//DROP DATABASE : 
exports.drop = (req, res) => {

	Rdv.remove({}, function (err) {
		console.log('collection removed')
	});
}

// Create and Save a new Rdv
exports.create = (req, res) => {
	// Validate request
	if (!req.body.cle) {
		return res.status(400).send({
			message: "Rdv cle can not be empty"
		});
	}

	// Create a Rdv
	const rdv = new Rdv({
		cle: req.body.cle || "Untitled Rdv",
		titre: req.body.titre,
		createur: req.body.createur,
		type: req.body.type,
		dateDebut: req.body.dateDebut,
		dateFin: req.body.dateFin,
		participant: req.body.participant,
		description: req.body.description,
		coordinates: req.body.coordinates,
		avatar: req.body.avatar
	});

	// Save Rdv in the database
	rdv.save()
		.then(data => {
			res.send(data);
		}).catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the Rdv."
			});
		});
};

// Retrieve and return all rdvs from the database.
exports.findAll = (req, res) => {
	Rdv.find()
		.then(rdvs => {
			res.send(rdvs);
		}).catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving rdvs."
			});
		});
};

// Find a single rdv with a rdvId
exports.findOnebyId = (req, res) => {
	Rdv.find({
		cle: req.params.cle
	}, function (err, rdv) {
		if (err) {
			res.send(err);
		}
		res.json(rdv);
	});
}

// Find rdv position for one user (titre minuscule)
exports.findOneRdvtitre = (req, res) => {
	Rdv.find({
		titre: {
			$regex: new RegExp("^" + req.params.titre.toLowerCase(), "i")
		}
	}, function (err, rdv) {
		if (err)
			res.send(err);
		res.json(rdv);
	});
}

// Find rdv position for one user (cle minuscule)
exports.findOneRdvkey = (req, res) => {
	Rdv.find({
		cle: {
			$regex: new RegExp("^" + req.params.cle.toLowerCase(), "i")
		}
	}, function (err, rdv) {
		if (err)
			res.send(err);
		res.json(rdv);
	});
}
// Update a rdv identified by the rdvId in the request
exports.updateCle = (req, res) => {

	// Find rdv and update it with the request body
	Rdv.findOneAndUpdate({
			cle: {
				$regex: new RegExp("^" + req.params.cle.toLowerCase(), "i")
			}
		}, {
			cle: req.body.cle,
			titre: req.body.titre,
			createur: req.body.createur,
			type: req.body.type,
			dateDebut: req.body.dateDebut,
			dateFin: req.body.dateFin,
			participant: req.body.participant,
			description: req.body.description,
			coordinates: req.body.coordinates,
			avatar: req.body.avatar
		}, {
			new: true
		})
		.then(rdv => {
			if (!rdv) {
				return res.status(404).send({
					message: "Rdv not found with id " + req.params.cle
				});
			}
			res.send(rdv);
		}).catch(err => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "Rdv not found with id " + req.params.cle
				});
			}
			return res.status(500).send({
				message: "Error updating rdv with id " + req.params.cle
			});
		});
};
// Update a rdv identified by the rdvId in the request
exports.updateMongoID = (req, res) => {

	// Find rdv and update it with the request body
	Rdv.findByIdAndUpdate(req.params.id, {
			cle: req.body.cle,
			titre: req.body.titre,
			type: req.body.type,
			dateDebut: req.body.dateDebut,
			dateFin: req.body.dateFin,
			participant: req.body.participant,
			description: req.body.description,
			coordinates: req.body.coordinates,
			avatar: req.body.avatar
		}, {
			new: true
		})
		.then(rdv => {
			if (!rdv) {
				return res.status(404).send({
					message: "Rdv not found with id " + req.params.id
				});
			}
			res.send(rdv);
		}).catch(err => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "Rdv not found with id " + req.params.id
				});
			}
			return res.status(500).send({
				message: "Error updating rdv with id " + req.params.id
			});
		});
};

// Delete a rdv with the specified MysqlID in the request
exports.deleteCle = (req, res) => {

	Rdv.findOneAndDelete({
			cle: req.params.cle
		})

		.then(rdv => {
			if (!rdv) {
				return res.status(404).send({
					message: "Rdv not found with cle " + req.params.cle
				});
			}
			res.send({
				message: "cle Rdv deleted successfully!"
			});
		}).catch(err => {
			if (err.kind === 'ObjectId' || err.name === 'NotFound') {
				return res.status(404).send({
					message: "cle  Rdv not found with id " + req.params.cle
				});
			}
			return res.status(500).send({
				message: "Could not delete Mysql id log rdv with id " + req.params.cle
			});
		});
};
// Delete a rdv with the specified MongoID in the request
exports.deleteMongoId = (req, res) => {
	Rdv.findByIdAndRemove(req.params.id)
		.then(rdv => {
			if (!rdv) {
				return res.status(404).send({
					message: "Rdv not found width id " + req.params.id
				});
			}
			res.send({
				message: "Rdv deleted successfully2!"
			});
		}).catch(err => {
			if (err.kind === 'ObjectId' || err.name === 'NotFound') {
				return res.status(404).send({
					message: "Rdv not found with id " + req.params.id
				});
			}
			return res.status(500).send({
				message: "Could not delete rdv with id " + req.params.id
			});
		});
};