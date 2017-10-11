module.exports = function(sequelize, DataTypes){
	var Report = sequelize.define("Report", {
		title: {
			type: DataTypes.STRING,
		},

		client: {
			type: DataTypes.STRING, 
		},

		date: {
			type: DataTypes.DATE, 
		},

		notes: {
			type: DataTypes.STRING,
		},

		table: {
			type: DataTypes.STRING,
		},

		category: {
			type: DataTypes.STRING, 
		}

	})

	return Report;
	
}