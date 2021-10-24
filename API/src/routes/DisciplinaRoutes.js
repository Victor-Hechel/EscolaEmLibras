import DisciplinaController from "../controllers/DisciplinaController.js"

export default class DisciplinaRoutes {

    static initializeRoutes(router){
        
        const controller = new DisciplinaController()

        router.get('/', controller.list.bind(controller))

        return router
    }

}