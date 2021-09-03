import RootController from "../controllers/RootController.js"

export default class RootRoutes {

    static initializeRoutes(router){
        router.post('/login', RootController.login)
        
        return router
    }

}