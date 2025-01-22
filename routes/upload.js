const path = require('path');
const fs = require('fs');
var formidable = require('express-formidable');
const KBMSDocumentModel = require( '../modules/models/kbmsdocumentmodel');


class UploadRouter {

    static getRouter(logic)
    {
        var express = require('express');
        var router = express.Router();
        const path = require('path');
        router.logic = logic;
        let me = this;

        router.post('', formidable({ uploadDir: '/tmp', maxFileSize: 1024 * 1024 * 50,
            maxFieldsSize: 1024 * 1024 * 10 }), async (req, res)=>{

            try
            {
                const kbmsUD = req.query.id;
                const user = req.query.user;
                // Get filemame only
                let originalFilename = req.files.file.name;

                //Get full filename with path
                let filename = req.files.file.path;

                //Get output filename from query parameter
                let outputFilename = req.query.output;
                if(outputFilename == null)
                    outputFilename = originalFilename;

                // Get the current directory
                const currentDirectory = __dirname;

                // Define the new directory name
                const newDirectoryName = 'uploads';

                // Create the full path for the new directory
                const newDirectoryPath = `${currentDirectory}/${newDirectoryName}`;

                //Create directory for uploads
                if(fs.existsSync(newDirectoryPath) == false)
                    fs.mkdirSync(newDirectoryPath);

                //Copy the uploaded file to upload directory
                fs.copyFileSync(filename, newDirectoryPath + "/" + outputFilename);

                //Delete the uploaded file
                fs.rmSync(filename);


                //Add to KBMS Document
                const newDoc = {
                    documentName: originalFilename,
                    documentPath: newDirectoryPath + "/" + outputFilename,
                    kbmsID: kbmsUD,
                    status: "Uploaded...",
                    createdBy: user
                };

                await KBMSDocumentModel.destroy({ where: { documentName: originalFilename}})

                //Save to database
                await KBMSDocumentModel.create(newDoc);

                //Send result
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

module.exports = UploadRouter;