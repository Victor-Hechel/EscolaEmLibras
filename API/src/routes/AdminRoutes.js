import AdminController from "../controllers/AdminController.js"

export default class AdminRoutes {

    static initializeRoutes(router){
        const controller = new AdminController()
        router.get('/', controller.list.bind(controller))
        router.get('/:id', controller.get.bind(controller))
        router.post('/', controller.create.bind(controller))
        router.put('/', controller.update.bind(controller))
        router.patch('/disable/:id', controller.disable.bind(controller))

        return router
    }

}