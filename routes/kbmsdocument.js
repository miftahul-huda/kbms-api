const { search } = require("../app");
const CrudRouter = require("./crudrouter");

class KBMSDocumentRouter extends CrudRouter{

    static getRouter(logic)
    {
        let router = super.getRouter(logic);

        router.get("/find-by-kbms/:id", function (req, res){
            let id = req.params.id;
            let search = req.query.search;
            let offset = req.query.offset;
            let limit = req.query.limit;
            let sort = req.query.sort;
            let filter = req.query.filter;
            if(filter != null)
            {
                filter = atob(filter);
                filter = JSON.parse(filter);
            }


            logic.findByKBMS(id, search, filter, offset, limit).then(function (os)
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