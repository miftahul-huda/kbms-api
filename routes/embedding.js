const path = require('path');
const fs = require('fs');
var formidable = require('express-formidable');
const KBMSDocumentModel = require( '../modules/models/kbmsdocumentmodel');


class EmbeddingRouter {

    static getRouter(logic)
    {
        var express = require('express');
        var router = express.Router();
        const path = require('path');
        router.logic = logic;
        let me = this;

        router.get('/embedding', async (req, res)=>{

            try
            {

                res.send({ success: true, payload: outputFilename })
            }
            catch(e)
            {
                //Send result
                res.send({ success: false, error: each })
            }
            
        });

        return router;
    }
}

module.exports = EmbeddingRouter;