import AlunoController from "../controllers/AlunoController.js"

export default class AlunoRoutes {

    static initializeRoutes(router){
        const controller = new AlunoController()
        router.get('/', controller.list.bind(controller))
        router.get('/:id', controller.get.bind(controller))
        router.post('/', controller.create.bind(controller))
        router.put('/', controller.update.bind(controller))
        router.patch('/disable/:id', controller.disable.bind(controller))

        return router
    }

}