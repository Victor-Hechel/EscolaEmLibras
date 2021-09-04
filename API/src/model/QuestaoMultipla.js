import mongoose from "mongoose";
const { Schema } = mongoose
import QuestaoSchema from "./Questao.js"

const options = { discriminatorKey: 'kind' }

const AlternativaSchema = new Schema({
    texto: String,
    midia: String
})

const QuestaoMultiplaSchema = new Schema({
    alternativas: [AlternativaSchema]
}, options)

const QuestaoMultiplaModel = QuestaoSchema.discriminator('QuestaoMultipla', QuestaoMultiplaSchema)

export default QuestaoMultiplaModel