import mongoose from "mongoose";
const { Schema, model } = mongoose


const alunoSchema = new Schema({
    cpf: { type: String, unique: true, required: true },
    nome: { type: String, required: true },
    dataNascimento: Date,
    email: { type: String, unique: true, required: true },
    genero: String,
    tipo: Number,
    senha: String,
    disabled: Boolean,
    pontos: Number
})

const AlunoModel = model('Aluno', alunoSchema)

export default AlunoModel