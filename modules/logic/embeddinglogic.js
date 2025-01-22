const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

const KBMSDocumentModel = require("../models/kbmsdocumentmodel")
const KBMSDocumentEmbeddingModel = require("../models/kbmsdocumentembeddingmodel");
const fs = require('fs');
const pdfParse = require('pdf-parse');

class EmbeddingLogic
{
    static async runEmbedding()
    {
        try
        {
            const documents = await KBMSDocumentModel.findAll({
                where: {
                    status : {
                        [Op.iLike]: '%Uploaded%'
                    }
                }
            });
            documents.map((doc)=>{
                const text = this.readDocument(doc);
                const texts = this.chunkDocument(doc, text, 1000, 20);
                const embeddings = this.embedDocument(doc, texts);
            })

        }
        catch(e)
        {

        }
    }

    static async readDocument(doc)
    {
        const docPath = doc.documentPath;

        let dataBuffer = fs.readFileSync(docPath);
        try {
            let data = await pdfParse(dataBuffer);
            //console.log(data.text); 
            return data.text;
        } catch (err) {
            console.error(err);
            return null;
        }

    }

    static async chunkDocument(doc, text, chunkSize, overlap)
    {
        const chunks = [];
        let start = 0;

        while (start < text.length) {
            let end = start + chunkSize;
            if (end > text.length) {
                end = text.length;
            }
            chunks.push(text.slice(start, end));
            start = end - overlap; 
        }

        return chunks;
    }

    static async embedDocument(doc, texts)
    {
        const embeddings = [];

    }
}

module.exports = EmbeddingLogic;
