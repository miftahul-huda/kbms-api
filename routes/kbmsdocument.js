const CrudRouter = require("./crudrouter");

class KBMSDocumentRouter extends CrudRouter{

    static getRouter(logic)
    {
        let router = super.getRouter(logic);

        router.get("/find-by-kbms/:id", function (req, res){
            let id = req.params.id;

            logic.findByKBMS(id).then(function (os)
            {
                res.send(os);
            }).catch(function (err){
                console.log("error")
                console.log(err)
                res.send(err);
            })
        });

        return router;
    };

}

module.exports = KBMSDocumentRouter;