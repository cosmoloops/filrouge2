const mongoose = require('mongoose');


const rdvCoordinateSchema = mongoose.Schema(
{
	//MysqlId: String,
	cle:String,
    titre: String,
	type:String,
	description:String,
	dateDebut:String,
	dateFin:String,
	participant:{
		pseudo:[]
	},
	coordinates:{
		longitude:Number,
		latitude:Number,
	},
	avatar:String
}, {
    timestamps: true
});

module.exports = mongoose.model('rdvCoordinate', rdvCoordinateSchema);