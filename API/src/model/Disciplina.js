import mongoose from "mongoose";
const { Schema, model } = mongoose

const disciplinaSchema = new Schema({
    nome: String,
    professor: { type: mongoose.Types.ObjectId, ref: "Professor" },
    turma: { type: mongoose.Types.ObjectId, ref: "Turma" }
})

const DisciplinaModel = model('Disciplina', disciplinaSchema)

export default DisciplinaModel