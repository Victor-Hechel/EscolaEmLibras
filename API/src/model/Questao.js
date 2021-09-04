import mongoose from "mongoose";
const { Schema, model } = mongoose

const options = { discriminatorKey: 'kind' }

const questaoSchema = new Schema({
    id: mongoose.Types.ObjectId,
    enunciado: String,
    midia: String,
    tarefaId: mongoose.Types.ObjectId
}, options)

const QuestaoModel = model('Questao', questaoSchema)

export default QuestaoModel