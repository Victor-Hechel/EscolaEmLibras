import UsuarioService from "../services/UsuarioService.js";
import SenhaInvalidaException from "../model/exceptions/SenhaInvalidaException.js"

export default class RootController {

    usuarioService;

    constructor(){
        this.usuarioService = new UsuarioService()
    }

    async login(req, resp) {
        try {
            const usuario = await this.usuarioService.buscarPorCredenciais(req.body.email, req.body.senha)

            if(!usuario){
                return resp.status(404).json({ mensagem: "Usuário não encontrado com essas credenciais" });
            }

            const token = this.usuarioService.gerarToken(usuario)

            resp.status(200).send({
                accessToken: token
            });
        }catch(e){
            if(e instanceof SenhaInvalidaException){
                resp.status(401).json({ mensagem: e.message })
            }else{
                resp.status(500).json({ mensagem: "Erro ao tentar gerar token" })    
            }
            
        }
        
    }

}