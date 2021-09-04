import mongoose from "mongoose";
const { Schema, model } = mongoose

const tarefaSchema = new Schema({
    id: mongoose.Types.ObjectId,
    titulo: String,
    midia: mongoose.Types.ObjectId,
    disciplina: { type: mongoose.Types.ObjectId, ref: 'Disciplina' },
    questoes: [{ type: mongoose.Types.ObjectId, ref: 'Questao' }]
})

const TarefaModel = model('Tarefa', tarefaSchema)

export default TarefaModel