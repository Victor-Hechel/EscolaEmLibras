import AlunoController from "../controllers/AlunoController.js"

export default class AlunoRoutes {

    static initializeRoutes(router){

        router.get('/', AlunoController.list)
        router.get('/:id', AlunoController.get)
        router.post('/', AlunoController.create)
        router.put('/', AlunoController.update)
        router.patch('/disable/:id', AlunoController.disable)

        return router
    }

}