const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

const CrudLogic = require("./crudlogic");
const LLMModel = require("../models/llmmodel");


class KBMSLogic extends CrudLogic {

    static getModel()
    {
        const model = require("../models/kbmsmodel");
        return model;
    }

    static getPk(){
        return "id";
    }

    static getWhere(search)
    {
        let where = {
            title : {
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

    static async get(id)
    {
        try
        {
            let result = await super.get(id);
            let o = result.payload;
            o = JSON.parse(JSON.stringify(o));
    
            const kbmsdocumentmodel = require("../models/kbmsdocumentmodel");
            let documents = await kbmsdocumentmodel.findAll({ where: {
                kbmsID: id
            } })
    
            o.documents = documents;
    
            result.payload = o;
            return result;
        }
        catch(error)
        {
            throw { success: false, message: '', error: error };
        }

    }

    static getModelIncludes()
    {
        let includes = [];
        includes.push({ model: LLMModel, as: 'llm' });
        return includes;
    }
}

module.exports = KBMSLogic;