import mongoose from "mongoose";
const { Schema } = mongoose
import QuestaoSchema from "./Questao.js"

const options = { discriminatorKey: 'kind' }

const ParSchema = new Schema({
    texto: String,
    midia: String
})

const QuestaoParesSchema = new Schema({
    colunaEsquerda: [ParSchema],
    colunaDireita: [ParSchema]
}, options)

const QuestaoParesModel = QuestaoSchema.discriminator('QuestaoPares', QuestaoParesSchema)

export default QuestaoParesModel