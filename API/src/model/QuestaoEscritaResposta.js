import mongoose from "mongoose";
const { Schema } = mongoose
import QuestaoRespostaSchema from "./QuestaoResposta.js"

const options = { discriminatorKey: 'kind' }

const QuestaoEscritaRespostaSchema = new Schema({ 
    respostaQuestao: String
}, options)

const QuestaoEscritaRespostaModel = QuestaoRespostaSchema.discriminator('QuestaoEscritaResposta', QuestaoEscritaRespostaSchema)

export default QuestaoEscritaRespostaModel