import mongoose from "mongoose";
const { Schema } = mongoose
import QuestaoSchema from "./Questao.js"

const options = { discriminatorKey: 'kind' }

const QuestaoEscritaSchema = new Schema({ }, options)

const QuestaoEscritaModel = QuestaoSchema.discriminator('QuestaoEscrita', QuestaoEscritaSchema)

export default QuestaoEscritaModel