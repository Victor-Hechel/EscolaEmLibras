import RespostaController from "../controllers/RespostaController.js"

export default class RespostaRoutes {

    static initializeRoutes(router){
        const controller = new RespostaController()
        router.post('/', RespostaController.create)
        router.post('/questao', controller.createRespostaQuestao.bind(controller))

        return router
    }

}