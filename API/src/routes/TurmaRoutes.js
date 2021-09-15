import TurmaController from "../controllers/TurmaController.js"

export default class TurmaRoutes {

    static initializeRoutes(router){
        
        const controller = new TurmaController()

        router.get('/', controller.list.bind(controller))
        router.get('/:id', controller.get.bind(controller))
        router.post('/', controller.create.bind(controller))
        router.put('/', TurmaController.update)
        // router.patch('/disable/:id', TurmaController.disable)

        return router
    }

}