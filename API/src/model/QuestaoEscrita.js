import mongoose from "mongoose";
const { Schema } = mongoose
import QuestaoSchema from "./Questao.js"

const options = { discriminatorKey: 'kind' }

const QuestaoRespostaSchema = new Schema({ }, options)

const QuestaoRespostaModel = QuestaoSchema.discriminator('QuestaoResposta', QuestaoRespostaSchema)

export default QuestaoRespostaModel