const CrudRouter = require("./crudrouter");

class LLMRouter extends CrudRouter{

    static getRouter(logic)
    {
        var router = super.getRouter(logic);
        router.logic = logic;
        let me = this;

        router.get('/download/:id', function (req, res){
            me.init(req, res);
            let id = req.params.id;

            console.log("DOWNLOAD")
            
            let logic = router.logic;
            logic.session = req.session;
    
            logic.download(id, function(progress){
                //console.log("progress")
                //console.log(progress)
                res.write(JSON.stringify(progress));
            });

        })

        return router;
        
    }

}

module.exports = LLMRouter;