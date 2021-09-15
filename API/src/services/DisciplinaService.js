import DisciplinaModel from "../model/Disciplina.js";

export default class DisciplinaService {
    
    async inserir(disciplina) {
        const disciplinaModel = new DisciplinaModel(disciplina)
        return await disciplinaModel.save()
    }
}