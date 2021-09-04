import TarefaModel from "../model/Tarefa.js"
import QuestaoEscritaModel from "../model/QuestaoEscrita.js"
import QuestaoMultiplaModel from "../model/QuestaoMultipla.js"
import QuestaoParesModel from "../model/QuestaoPares.js"

export default class TarefaController {

    static async create(req, resp) {
        
        const tarefaModel = new TarefaModel({
            titulo: req.body.titulo,
            midia: req.body.midia,
            disciplina: req.body.disciplina
        })

        for(const questao of req.body.questoes){

            const questaoBody = {
                enunciado: questao.enunciado,
                midia: questao.midia
            }

            let questaoModel

            if(questao.tipo == 'multipla'){
                questaoBody.alternativas = questao.alternativas.map(alt => (
                    { letra: alt.letra, texto: alt.texto }
                ))

                questaoModel = new QuestaoMultiplaModel(questaoBody)
            }else if(questao.tipo == 'escrita') {
                questaoModel = new QuestaoEscritaModel(questaoBody)
            }
            else if(questao.tipo == 'pares') {
                questaoBody.colunaEsquerda = questao.colunaEsquerda
                questaoBody.colunaDireita = questao.colunaDireita
                questaoModel = new QuestaoParesModel(questaoBody)
            }
            tarefaModel.questoes.push(questaoModel)
        }

        try{
            await tarefaModel.save()
            for(const questao of tarefaModel.questoes){
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

}