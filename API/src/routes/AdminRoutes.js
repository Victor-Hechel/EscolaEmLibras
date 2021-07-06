import AdminController from "../controllers/AdminController.js"

export default class AdminRoutes {

    static initializeRoutes(router){
        router.get('/', AdminController.list)
        router.get('/:id', AdminController.get)
        router.post('/', AdminController.create)
        router.put('/', AdminController.update)
        router.patch('/disable/:id', AdminController.disable)

        return router
    }

}