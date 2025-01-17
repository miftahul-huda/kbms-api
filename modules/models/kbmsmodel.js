const { Model, DataTypes } = require('sequelize');

class KBMSModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            embedingLLM: DataTypes.INTEGER,
            createdBy: DataTypes.STRING
        }, 
        { sequelize, modelName: 'kbms', tableName: 'kbms', force: force });
    }
}

module.exports = KBMSModel;