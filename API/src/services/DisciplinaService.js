import DisciplinaModel from "../model/Disciplina.js";
import TurmaModel from "../model/Turma.js";
import ProfessorModel from "../model/Professor.js";


export default class DisciplinaService {
    
    async inserir(disciplina) {
        const disciplinaModel = new DisciplinaModel(disciplina)
        return await disciplinaModel.save()
    }

    async buscarPorId(id) {
        return await DisciplinaModel.findById(id)
    }

    async listar(params) {
        const filtros = { }

        if(params.professorId)
            filtros.professor = params.professorId

        const disciplinas = await DisciplinaModel.find(filtros)

        const response = await Promise.all(disciplinas.map(async x => {
            x.turma = await TurmaModel.findById(x.turma)
            x.professor = await ProfessorModel.findById(x.professor)
            return x
        }))

        return response
    }
}