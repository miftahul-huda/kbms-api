const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

const CrudLogic = require("./crudlogic");
const KBMSDocumentModel = require("../models/kbmsdocumentmodel");

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

    static async findByKBMS(id, search, filter, offset, limit)
    {
        try
        {
            let model = this.getModel();
            let where = this.getWhere(search);

            if(filter != null)
                where = this.getWhereFromFilter(filter);

            where = {
                    [Op.and]:[ where]
            }

            where[Op.and].push({
                kbmsID: id
            });

            let order = this.getOrder();

            let result = await this.findAll(where, offset, limit, order);
            
            return { success: true, payload: result.payload }
        }
        catch(error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async delete(id)
    {

        let file = await KBMSDocumentModel.findOne({ where: { id: id } });
        fs.rmSync(file.documentPath);
        let result = await super.delete(id);
        return result;
    }
}

module.exports = KBMSDocumentLogic;