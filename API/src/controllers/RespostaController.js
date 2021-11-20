import RespostaAlunoModel from "../model/RespostaAluno.js"
import RespostaService from "../services/RespostaService.js"


export default class RespostaController {

    constructor(){
        this.respostaService = new RespostaService()
    }

    static async create(req, resp) {

        try{

            const respostaAluno = await 
                new RespostaAlunoModel({
                    tarefa: req.body.tarefaId,
                    aluno: req.body.alunoId,
                    dataResposta: new Date()
                }).save()

            resp.status(201).json({
                id: respostaAluno._id,
                tarefa: respostaAluno.tarefa,
                aluno: respostaAluno.aluno,
                dataResposta: respostaAluno.dataResposta
            })

        }catch(err){
            console.log(err)
            resp.status(500).json({
                mensagem: "Erro ao tentar criar resposta"
            })
        }

    }

    async createRespostaQuestao(req, resp) {

        try{
            const resposta = await this.respostaService.responderQuestao(
                req.body.respostaId, 
                req.body.questao, 
                req.body.respondido)

            resp.status(201).json(resposta)
        }catch(err){
            console.log(err)
            resp.status(500).json({
                mensagem: "Erro ao tentar responder questao"
            })
        }
    
    }

    async carregar(req, resp) {
        try{
            const respostaAluno = await this.respostaService.carregar(req.params.id)

            const gabarito = await this.respostaService.carregarGabarito(respostaAluno.tarefaId)

            for(const questao of respostaAluno.questoes){
                if(!questao.respostaAluno.certa){
                    questao.respostaCerta = gabarito.questoes.filter(x => x.questao.equals(questao.respostaAluno.questao))[0]
                }
            }

            resp.status(200).json({
                resposta: respostaAluno
            })

        }catch(err){
            console.log(err)
            resp.status(500).json({
                mensagem: "Falha ao tentar carregar resposta"
            })
        }
    }

    async listar(req, resp) {
        try{
            const respostas = await this.respostaService.listarPorAluno(req.query.alunoId)

            resp.status(200).json({
                respostas
            })

        }catch(err){
            console.log(err)
            resp.status(500).json({
                mensagem: "Falha ao tentar listar respostas"
            })
        }
    }

}