import mongoose from "mongoose";
const { Schema, model } = mongoose

const options = { discriminatorKey: 'kind' }

const respostaSchema = new Schema({
    tarefa: { type: mongoose.Types.ObjectId, ref: 'Tarefa' },
    questoes: [{ type: mongoose.Types.ObjectId, ref: 'QuestaoResposta' }]
}, options)

const RespostaModel = model('Resposta', respostaSchema)

export default RespostaModel