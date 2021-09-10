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
        // console.log(obj.questao)
        const questao = await QuestaoModel.findById(obj.questao)
        // console.log(questao)
        
        const questaoResposta = {
            resposta: obj.respostaId,
            questao: questao._id
        }

        let questaoRespostaModel
        RespostaController.estaCorreta(obj.respostaId, obj.questao)
        return;
        if (questao instanceof QuestaoMultiplaModel){
            questaoRespostaModel = new QuestaoMultiplaRespostaModel({
                ...questaoResposta,
                alternativa: obj.respondido
            })
        } else if (questao instanceof QuestaoEscritaModel) {
            questaoRespostaModel = new QuestaoEscritaRespostaModel({
                ...questaoResposta,
                respostaQuestao: obj.respondido
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

    static async estaCorreta(respostaId, questaoId, questaoRespostaAluno) {
        const respostaAluno = await RespostaAlunoModel.findById(respostaId)
        const respostaTarefa = await RespostaModel.findOne({
            kind: null,
            tarefa: respostaAluno.tarefa
        })
        
        const questoes = await Promise.all(respostaTarefa.questoes.map(async questaoId => await QuestaoRespostaModel.findById(questaoId)))
        
        const questaoGabarito = questoes.filter(q => q.questao == questaoId)

        if (questaoGabarito instanceof QuestaoMultiplaRespostaModel){
            return questaoGabarito.alternativa == respostaAluno.alternativa
        } else if (questaoGabarito instanceof QuestaoEscritaRespostaModel) {
            questaoGabarito.respostaQuestao


        } else if (questaoGabarito instanceof QuestaoParesRespostaModel) {
            questaoRespostaModel = new QuestaoParesRespostaModel({
                ...questaoResposta,
                pares: obj.respondido
            })
        }

    }

}