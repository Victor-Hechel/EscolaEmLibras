import TarefaController from "../controllers/TarefaController.js"

export default class TarefaRoutes {

    static initializeRoutes(router){

        const controller = new TarefaController()

        router.post('/', TarefaController.create)
        router.get('/', controller.listar.bind(controller))

        return router
    }

}