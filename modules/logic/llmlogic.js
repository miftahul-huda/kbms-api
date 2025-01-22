const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

const CrudLogic = require("./crudlogic");
const https = require('https');
const axios = require('axios');
const LLMModel = require('../models/llmmodel');

class LLMLogic extends CrudLogic {

    static getModel()
    {
        const model = require("../models/llmmodel");
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

    static async download(id, progressCallback)
    {
        try
        {
            let o = await LLMModel.findOne({ where: { id: id } });
            let previousPercentage = 0;
            o.downloaded = 0;
            await LLMModel.update(o, { where: { id: id } });

            this.pullModel(o.title, function(json){

                try
                {
                    let percentage = json.completed / json.total * 100;
                    if(Number.isNaN(percentage))
                        percentage = 0;
                    percentage = Math.round(percentage);
                    if(percentage != previousPercentage)
                    {
                        o.downloaded = percentage;
                        LLMModel.update(o, { where: { id: id } });
                        previousPercentage = percentage;
                    }

                }
                catch(e)
                {

                }
                if(this.progressCallback != null)
                    this.progressCallback(json);
            })
        }
        catch(e)
        {
            throw e;
        }
    }

    static async pullModel(model, progressCallback) {
        try {
            const url = `http://${process.env.OLLAMA_HOST}:11434/api/pull`;
            const response = await axios.post(url, {model: model}, {
                responseType: 'stream'
            });
            
            const stream = response.data;
            
            for await (const chunk of stream) {

                let json = {};
                try
                {
                    json  = JSON.parse(chunk.toString());
                }
                catch(e)
                {
                }
                if(progressCallback != null)
                    progressCallback(json);
            }

        } catch (error) {
            console.error('Error pulling model:', error);
        }
    }
}

module.exports = LLMLogic;