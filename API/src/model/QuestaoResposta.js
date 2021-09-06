import mongoose from "mongoose";
const { Schema, model } = mongoose

const options = { discriminatorKey: 'kind' }

const questaoRespostaSchema = new Schema({
    resposta: { type: mongoose.Types.ObjectId, ref: "Resposta" },
    questao: { type: mongoose.Types.ObjectId, ref: "Questao" }
}, options)

const QuestaoRespostaModel = model('QuestaoResposta', questaoRespostaSchema)

export default QuestaoRespostaModel