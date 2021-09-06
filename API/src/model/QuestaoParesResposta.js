import mongoose from "mongoose";
const { Schema } = mongoose
import QuestaoRespostaSchema from "./QuestaoResposta.js"

const options = { discriminatorKey: 'kind' }

const ParSchema = new Schema({
    colunaEsquerda: mongoose.Types.ObjectId,
    colunaDireita: mongoose.Types.ObjectId
})

const QuestaoParesRespostaSchema = new Schema({
    pares: [ParSchema]
}, options)

const QuestaoParesRespostaModel = QuestaoRespostaSchema.discriminator('QuestaoParesResposta', QuestaoParesRespostaSchema)

export default QuestaoParesRespostaModel