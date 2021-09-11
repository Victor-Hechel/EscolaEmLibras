import ProfessorModel from "../model/Professor.js"

export default class ProfessorService {

    async listarTodos(){
        return await ProfessorModel.find({})
    }

    async buscarPorId(id){
        return await ProfessorModel.findById(id)
    }

    async inserir(professor){
        return await new ProfessorModel(professor).save()
    }

    async atualizar(professor) {
        await professor.save()
    }
}