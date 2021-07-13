import ProfessorController from "../controllers/ProfessorController.js"

export default class ProfessorRoutes {

    static initializeRoutes(router){
        router.get('/', ProfessorController.list)
        router.get('/:id', ProfessorController.get)
        router.post('/', ProfessorController.create)
        router.put('/', ProfessorController.update)
        router.patch('/disable/:id', ProfessorController.disable)

        return router
    }

}