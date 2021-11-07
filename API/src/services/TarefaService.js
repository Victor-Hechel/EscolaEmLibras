import TarefaModel from "../model/Tarefa.js"
import DisciplinaModel from "../model/Disciplina.js"
import QuestaoEscritaModel from "../model/QuestaoEscrita.js"
import QuestaoMultiplaModel from "../model/QuestaoMultipla.js"
import QuestaoModel from "../model/Questao.js"


export default class TarefaService {

    async listar(params){
        const filtros = { }

        if(params.disciplinaId)
            filtros.disciplina = params.disciplinaId

        const tarefas = await TarefaModel.find(filtros)

        return tarefas.map(tarefa => ({
            id: tarefa._id,
            titulo: tarefa.titulo,
            disciplina: tarefa.disciplina,
            questoes: tarefa.questoes
        }))

    }

    async carregar(id) {
        const tarefa = await TarefaModel.findById(id)
        tarefa.disciplina = await DisciplinaModel.findById(tarefa.disciplina)

        const questoesCarregadas = []

        for(const questao of tarefa.questoes){
            const questaoGenericaCarregada = await QuestaoModel.findById(questao)
            if(questaoGenericaCarregada.kind === 'QuestaoEscrita')
                questoesCarregadas.push(await QuestaoEscritaModel.findById(questao))
            else if(questaoGenericaCarregada.kind === 'QuestaoMultipla')
                questoesCarregadas.push(await QuestaoMultiplaModel.findById(questao))
        }

        tarefa.questoes = questoesCarregadas

        return tarefa
    }

}
