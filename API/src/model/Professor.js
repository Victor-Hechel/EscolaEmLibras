import mongoose from "mongoose";
import UsuarioModel from "./Usuario.js"
const { Schema, model } = mongoose


const options = { discriminatorKey: 'kind' }


const professorSchema = new Schema({ }, options)

const ProfessorModel = UsuarioModel.discriminator('Professor', professorSchema)

export default ProfessorModel