const { Model, Sequelize, DataTypes } = require('sequelize');
const pgvector = require('pgvector/sequelize');

// Register the pgvector data type with Sequelize
pgvector.registerType(Sequelize);

class KBMSDocumentEmbeddingModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            documentName: DataTypes.STRING,
            chunkContent: DataTypes.TEXT,
            embeddedContent: DataTypes.VECTOR(128),
            documemtID: DataTypes.INTEGER
        }, 
        { sequelize, modelName: 'kbmsdocumentembeding', tableName: 'kbmsdocumentembeding', force: force });
    }
}

module.exports = KBMSDocumentEmbeddingModel;