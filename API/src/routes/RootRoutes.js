import RootController from "../controllers/RootController.js"

export default class RootRoutes {

    static initializeRoutes(router){
        const controller = new RootController()
        router.post('/login', controller.login.bind(controller))
        
        return router
    }

}