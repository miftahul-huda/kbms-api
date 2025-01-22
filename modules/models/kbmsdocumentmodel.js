const { Model, DataTypes } = require('sequelize');

class KBMSDocumentModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            documentName: DataTypes.STRING,
            documentPath: DataTypes.STRING,
            createdBy: DataTypes.STRING,
            kbmsID: DataTypes.INTEGER,
            status: DataTypes.STRING
        }, 
        { sequelize, modelName: 'kbmsdocument', tableName: 'kbmsdocument', force: force });
    }
}

module.exports = KBMSDocumentModel;