import mongoose from "mongoose";
const { Schema, model } = mongoose

const turmaSchema = new Schema({
    codigo: String,
    alunos: [String],
    disciplinas: [{ type: mongoose.Types.ObjectId, ref: 'Disciplina' }]
})

const TurmaModel = model('Turma', turmaSchema)

export default TurmaModel