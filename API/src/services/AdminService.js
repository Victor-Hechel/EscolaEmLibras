import AdminModel from "../model/Admin.js"

export default class AdminService {

    async listarTodos(){
        return await AdminModel.find({})
    }

    async buscarPorId(id){
        return await AdminModel.findById(id)
    }

    async inserir(admin){
        return await new AdminModel(admin).save()
    }

    async atualizar(admin) {
        await admin.save()
    }
}