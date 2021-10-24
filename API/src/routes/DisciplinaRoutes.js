import DisciplinaController from "../controllers/DisciplinaController.js"

export default class DisciplinaRoutes {

    static initializeRoutes(router){
        
        const controller = new DisciplinaController()

        router.get('/', controller.list.bind(controller))
        router.get('/:id', controller.carregar.bind(controller))
        return router
    }

}