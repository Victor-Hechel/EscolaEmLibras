import TurmaModel from "../model/Turma.js";
import DisciplinaService from "./DisciplinaService.js";
import AlunoService from "./AlunoService.js";

export default class TurmaService {

    constructor(){
        this.disciplinaService = new DisciplinaService()
        this.alunoService = new AlunoService()
    }

    async inserir(reqBody) {

        const turmaModel = new TurmaModel({
            codigo: reqBody.codigo,
            alunos: reqBody.alunos,
            disciplinas: []
        })

        for(let disciplina of reqBody.disciplinas) {

            disciplina.turma = turmaModel._id
            const disciplinaModel = await this.disciplinaService.inserir(disciplina)
            turmaModel.disciplinas.push(disciplinaModel)
            
        }

        return await turmaModel.save()
    }

    async listar(params) {
        const filtro = { }

        if(params.alunoId){
            filtro.alunos = params.alunoId
        }

        const turmas =  await TurmaModel.find(filtro)
        
        for(const turma of turmas) {
            turma.disciplinas = await Promise.all(turma.disciplinas.map(async x => await this.disciplinaService.buscarPorId(x)))
        }

        return turmas
    }

    async buscarPorId(id) {

        const turma = await TurmaModel.findById(id)
        
        if(!turma){
            return null
        }
        
        turma.disciplinas = await Promise.all(turma.disciplinas.map(async x => await this.disciplinaService.buscarPorId(x)))
        
        turma.alunos = await Promise.all(turma.alunos.map(async x => await this.alunoService.buscarPorId(x)))
        return turma
    }
                

}