import RespostaController from "../controllers/RespostaController.js"

export default class RespostaRoutes {

    static initializeRoutes(router){
        router.post('/', RespostaController.create)

        return router
    }

}