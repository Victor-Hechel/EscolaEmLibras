import mongoose from "mongoose";
import UsuarioModel from "./Usuario.js"
const { Schema, model } = mongoose


const options = { discriminatorKey: 'kind' }


const adminSchema = new Schema({ }, options)

const AdminModel = UsuarioModel.discriminator('Admin', adminSchema)

export default AdminModel