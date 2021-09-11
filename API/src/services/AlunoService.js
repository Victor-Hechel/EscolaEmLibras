import AlunoModel from "../model/Aluno.js"

export default class AlunoService {

    async listarTodos(){
        return await AlunoModel.find({})
    }

    async buscarPorId(id){
        return await AlunoModel.findById(id)
    }

    async inserir(aluno){
        return await new AlunoModel(aluno).save()
    }

    async atualizar(aluno) {
        await aluno.save()
    }
}