import mongoose from "mongoose";
const { Schema } = mongoose
import QuestaoRespostaSchema from "./QuestaoResposta.js"

const options = { discriminatorKey: 'kind' }

const QuestaoMultiplaRespostaSchema = new Schema({
    alternativa: mongoose.Types.ObjectId
}, options)

const QuestaoMultiplaRespostaModel = QuestaoRespostaSchema.discriminator('QuestaoMultiplaResposta', QuestaoMultiplaRespostaSchema)

export default QuestaoMultiplaRespostaModel