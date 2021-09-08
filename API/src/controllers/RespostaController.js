import RespostaAlunoModel from "../model/RespostaAluno.js"
import QuestaoModel from "../model/Questao.js"
import QuestaoMultiplaModel from "../model/QuestaoMultipla.js"
import QuestaoEscritaModel from "../model/QuestaoEscrita.js"
import QuestaoParesModel from "../model/QuestaoPares.js"
import QuestaoMultiplaRespostaModel from "../model/QuestaoMultiplaResposta.js"
import QuestaoEscritaRespostaModel from "../model/QuestaoEscritaResposta.js"
import QuestaoParesRespostaModel from "../model/QuestaoParesResposta.js"


export default class RespostaController {

    static async create(req, resp) {

        try{

            const respostaAluno = await 
                new RespostaAlunoModel({
                    tarefa: req.body.tarefaId,
                    aluno: req.user._id,
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

    static async createRespostaQuestao(req, resp) {
        const obj = {
            respostaId: req.body.respostaId,
            questao: req.body.questao,
            respondido: req.body.respondido
        }
        console.log(obj.questao)
        const questao = await QuestaoModel.findById(obj.questao)
        console.log(questao)
        
        const questaoResposta = {
            resposta: obj.respostaId,
            questao: questao._id
        }

        let questaoRespostaModel

        if (questao instanceof QuestaoMultiplaModel){
            questaoRespostaModel = new QuestaoMultiplaRespostaModel({
                ...questaoResposta,
                alternativa: obj.respondido
            })
        } else if (questao instanceof QuestaoEscritaModel) {
            questaoRespostaModel = new QuestaoEscritaRespostaModel({
                ...questaoResposta,
                respondido: obj.respondido
            })
        } else if (questao instanceof QuestaoParesModel) {
            questaoRespostaModel = new QuestaoParesRespostaModel({
                ...questaoResposta,
                pares: obj.respondido
            })
        }

        await questaoRespostaModel.save()

        resp.status(204).send()
    }

}