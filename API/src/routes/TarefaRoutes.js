import TarefaController from "../controllers/TarefaController.js"

export default class TarefaRoutes {

    static initializeRoutes(router){
        router.post('/', TarefaController.create)

        return router
    }

}