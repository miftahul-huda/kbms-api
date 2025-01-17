const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

const CrudLogic = require("./crudlogic");

class KBMSDocumentLogic extends CrudLogic {

    static getModel()
    {
        const model = require("../models/kbmsdocumentmodel");
        return model;
    }

    static getPk(){
        return "id";
    }

    static getWhere(search)
    {
        let where = {
            documentName : {
                [Op.like] : "%" + search + "%"
            } 
        }
        return where;
    }

    static getOrder()
    {
        let order = [['createdAt', 'DESC']];
        return order;
    }

    static async findByKBMS(id)
    {
        try
        {
            let model = this.getModel();
            let documents = await model.findAll({ where: {
                kbmsID: id
            } });
            
            return { success: true, payload: documents }
        }
        catch(error)
        {
            throw { success: false, message: '', error: error };
        }
    }
}

module.exports = KBMSDocumentLogic;