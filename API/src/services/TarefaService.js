import TarefaModel from "../model/Tarefa.js"

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

}
