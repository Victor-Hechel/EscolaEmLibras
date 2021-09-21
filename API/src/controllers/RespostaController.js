import RespostaModel from "../model/Resposta.js"
import RespostaAlunoModel from "../model/RespostaAluno.js"
import QuestaoModel from "../model/Questao.js"
import QuestaoMultiplaModel from "../model/QuestaoMultipla.js"
import QuestaoEscritaModel from "../model/QuestaoEscrita.js"
import QuestaoParesModel from "../model/QuestaoPares.js"
import QuestaoRespostaModel from "../model/QuestaoResposta.js"
import QuestaoMultiplaRespostaModel from "../model/QuestaoMultiplaResposta.js"
import QuestaoEscritaRespostaModel from "../model/QuestaoEscritaResposta.js"
import QuestaoParesRespostaModel from "../model/QuestaoParesResposta.js"
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
                    aluno: req.id,
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
                message: "Erro ao tentar responder questao"
            })
        }
    
    }

}