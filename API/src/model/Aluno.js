import mongoose from "mongoose"
import UsuarioModel from "./Usuario.js"
const { Schema, model } = mongoose


const options = { discriminatorKey: 'kind' }

const alunoSchema = new Schema({
    pontos: Number
}, options)

const AlunoModel = UsuarioModel.discriminator('Aluno', alunoSchema)

export default AlunoModel