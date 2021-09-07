import mongoose from "mongoose";
const { Schema } = mongoose
import RespostaSchema from "./Resposta.js"

const options = { discriminatorKey: 'kind' }

const RespostaAlunoSchema = new Schema({ 
    aluno: { type: mongoose.Types.ObjectId, ref: "Aluno" },
    dataResposta: Date
}, options)

const RespostaAlunoModel = RespostaSchema.discriminator('RespostaAluno', RespostaAlunoSchema)

export default RespostaAlunoModel