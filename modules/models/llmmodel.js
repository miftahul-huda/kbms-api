const { Model, DataTypes } = require('sequelize');

class LLMModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            modelPath: DataTypes.TEXT,
        }, 
        { sequelize, modelName: 'llm', tableName: 'llm', force: force });
    }
}

module.exports = LLMModel;