const mongoose = require('mongoose');


const GpsCoordonateSchema = mongoose.Schema(
{
	MysqlId: String,
    pseudo: String,
	coordinates:{
		longitude:Number,
		latitude:Number,
	},
	avatar:String
}, {
    timestamps: true
});

module.exports = mongoose.model('GpsCoordonate', GpsCoordonateSchema);