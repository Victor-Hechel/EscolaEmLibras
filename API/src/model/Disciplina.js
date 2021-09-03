import mongoose from "mongoose";
const { Schema, model } = mongoose

const disciplinaSchema = new Schema({
    nome: String,
    professorId: mongoose.Types.ObjectId,
    turmaId: mongoose.Types.ObjectId
})

const DisciplinaModel = model('Disciplina', disciplinaSchema)

export default DisciplinaModel