import DisciplinaService from "../services/DisciplinaService.js";

export default class DisciplinaController {

    constructor(){
        this.disciplinaService = new DisciplinaService()
    }

    async carregar(req, resp) {
        try{

            const disciplina = await this.disciplinaService.buscarPorId(req.params.id)

            if(!disciplina){
                resp.status(204).send()
                return
            }

            resp.status(200).json({
                disciplina: {
                    id: disciplina._id,
                    nome: disciplina.nome,
                    turma: disciplina.turma
                }
            })

        }catch(err){
            console.log(err)
            resp.status(500).json({
                mensagem: "Falha ao tentar carregar a disciplina"
            })
        }

    }

    async list(req, resp){
        try{

            const disciplinas = await this.disciplinaService.listar({
                professorId: req.query.professorId
            })

            if(!disciplinas.length) {
                resp.status(204).json()
                return;
            }
            
            resp.status(200).json({
                disciplinas: disciplinas.map(x => ({
                    id: x._id,
                    nome: x.nome,
                    turma: {
                        id: x.turma._id,
                        codigo: x.turma.codigo
                    },
                    professor: {
                        id: x.professor._id,
                        nome: x.professor.nome
                    }
                }))
            })

        }catch(err){
            console.log(err)
            resp.status(500).json({
                mensagem: "Falha ao tentar listar as disciplinas"
            })
        }
    }
}