import TurmaController from "../controllers/TurmaController.js"

export default class TurmaRoutes {

    static initializeRoutes(router){
        router.get('/', TurmaController.list)
        router.get('/:id', TurmaController.get)
        router.post('/', TurmaController.create)
        router.put('/', TurmaController.update)
        // router.patch('/disable/:id', TurmaController.disable)

        return router
    }

}