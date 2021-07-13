import mongoose from "mongoose";
const { Schema, model } = mongoose

const options = { discriminatorKey: 'kind' }

const usuarioSchema = new Schema({
    cpf: { type: String, unique: true, required: true },
    nome: { type: String, required: true },
    dataNascimento: Date,
    email: { type: String, unique: true, required: true },
    genero: String,
    tipo: Number,
    senha: String,
    disabled: Boolean
}, options)

const UsuarioModel = model('Usuario', usuarioSchema)

export default UsuarioModel