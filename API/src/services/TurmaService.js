import TurmaModel from "../model/Turma.js";
import DisciplinaService from "./DisciplinaService.js";

export default class TurmaService {

    constructor(){
        this.disciplinaService = new DisciplinaService()
    }

    async inserir(reqBody) {
        const turmaModel = new TurmaModel({
            codigo: reqBody.codigo,
            alunos: reqBody.alunos,
            disciplinas: []
        })

        for(let disciplina of reqBody.disciplinas) {

            disciplina.turmaId = turmaModel._id
            const disciplinaModel = await this.disciplinaService.inserir(disciplina)
            turmaModel.disciplinas.push(disciplinaModel)
            
        }

        return await turmaModel.save()
    }

    async listarTodas() {
        return await TurmaModel.find({})
    }

    async buscarPorId(id) {

        const turma = await TurmaModel.findById(id)
        
        if(!turma){
            return null
        }

        turma.disciplinas = Promise.all(turma.disciplinas.map(async x => await DisciplinaModel.findById(x)))

        return turma
    }
                

}