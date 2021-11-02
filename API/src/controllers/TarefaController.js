import TarefaModel from "../model/Tarefa.js"
import RespostaModel from "../model/Resposta.js"
import QuestaoEscritaModel from "../model/QuestaoEscrita.js"
import QuestaoMultiplaModel from "../model/QuestaoMultipla.js"
import QuestaoParesModel from "../model/QuestaoPares.js"
import QuestaoEscritaRespostaModel from "../model/QuestaoEscritaResposta.js"
import QuestaoMultiplaRespostaModel from "../model/QuestaoMultiplaResposta.js"
import QuestaoParesRespostaModel from "../model/QuestaoParesResposta.js"
import TarefaService from "../services/TarefaService.js"

export default class TarefaController {

    constructor() {
        this.tarefaService = new TarefaService()
    }

    static async create(req, resp) {
        
        const tarefaModel = new TarefaModel({
            titulo: req.body.titulo,
            midia: req.body.midia,
            disciplina: req.body.disciplina
        })

        const respostaModel = new RespostaModel({
            tarefa: tarefaModel._id,
            questoes: []
        })

        for(const questao of req.body.questoes){

            const questaoBody = {
                enunciado: questao.enunciado,
                midia: questao.midia
            }

            let questaoModel
            let questaoRespostaModel

            if(questao.tipo == 'multipla'){
                questaoBody.alternativas = questao.alternativas.map(alt => (
                    { texto: alt.texto, midia: alt.midia }
                ))

                questaoModel = new QuestaoMultiplaModel(questaoBody)
                
                const alternativaCorreta = questao.alternativas.find(alt => alt.correta == true)
                console.log(questaoBody)
                const alternativaCorretaId = questaoModel.alternativas.find(alt => alt.texto == alternativaCorreta.texto || alt.midia == alternativaCorreta.midia)._id

                questaoRespostaModel = new QuestaoMultiplaRespostaModel({
                    alternativa: alternativaCorretaId
                })

            }else if(questao.tipo == 'escrita') {
                questaoModel = new QuestaoEscritaModel(questaoBody)
                questaoRespostaModel = new QuestaoEscritaRespostaModel({
                    respostaQuestao: questao.resposta
                })
            }
            else if(questao.tipo == 'pares') {
                questaoBody.colunaEsquerda = questao.colunaEsquerda
                questaoBody.colunaDireita = questao.colunaDireita
                questaoModel = new QuestaoParesModel(questaoBody)

                questaoRespostaModel = new QuestaoParesRespostaModel({
                    pares: questaoModel.colunaEsquerda.map((item, i) => 
                        (
                            {
                                colunaEsquerda: item._id,
                                colunaDireita: questaoModel.colunaDireita[i]._id
                            }
                        )
                    )
                })

            }

            tarefaModel.questoes.push(questaoModel)
            questaoRespostaModel.questao = questaoModel._id
            respostaModel.questoes.push(questaoRespostaModel)
        }

        try{
            await tarefaModel.save()

            for(let questao of tarefaModel.questoes){
                questao.tarefaId = tarefaModel._id
                await questao.save()
            }

            await respostaModel.save()
            for(let questao of respostaModel.questoes){
                questao.resposta = respostaModel._id
                await questao.save()
            }

            resp.status(201).json({ 
                id: tarefaModel._id,
                titulo: tarefaModel.titulo,
                midia: tarefaModel.midia,
                disciplina: tarefaModel.disciplina,
                questoes: tarefaModel.questoes.map(q => (
                    {
                        id: q._id,
                        enunciado: q.enunciado
                    }
                ))
             })
        }catch(err){
            console.log(err)
            resp.status(500).json("Falha ao tentar criar atividade")
        }

    }

    async listar(req, resp) {

        try{
            const tarefas = await this.tarefaService.listar({
                disciplinaId: req.query.disciplinaId
            })

            resp.status(200).json({ tarefas })
        }catch(err){
            console.log(err)
            resp.status(500).json({
                message: "Erro ao tentar listar tarefas"
            })
        }

    }

}