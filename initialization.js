//const LoggerModel  = require( './modules/models/loggermodel')

const { Sequelize, Model, DataTypes } = require('sequelize');
const process = require('process');

const KBMSModel = require( './modules/models/kbmsmodel')
const KBMSDocumentModel = require( './modules/models/kbmsdocumentmodel')
const KBMSDocumentEmbeddingModel = require( './modules/models/kbmsdocumentembeddingmodel')
const LLMModel = require( './modules/models/llmmodel');
const { logger } = require('sequelize/lib/utils/logger');



const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASSWORD, {
    host: process.env.DBHOST,
    dialect: process.env.DBENGINE ,
    logging: false
});


class Initialization {
    static async initializeDatabase(){

        let force = false;
        await KBMSModel.initialize(sequelize, force);
        await KBMSDocumentModel.initialize(sequelize, force);
        await KBMSDocumentEmbeddingModel.initialize(sequelize, force);
        await LLMModel.initialize(sequelize, force);

        KBMSModel.belongsTo(LLMModel, { as: 'llm', foreignKey: 'embedingLLM', targetKey: 'id' });
        //KBMSDocumentModel.belongsTo(KBMSModel, { as: 'kbmsID', foreignKey: 'kbmsID' });
        //KBMSDocumentEmbeddingModel.belongsTo(KBMSDocumentModel, { as: 'documemtID', foreignKey: 'documemtID' })
        await sequelize.sync();
    }
}

module.exports = Initialization



