import UsuarioModel from "../model/Usuario.js"
import SenhaInvalidaException from "../model/exceptions/SenhaInvalidaException.js"

import { createHmac } from 'crypto'
import jwt from 'jsonwebtoken'
const secret = "pwdSecretTest"

export default class UsuarioService {


    async buscarPorCredenciais(email, senha) {
        const usuario = await UsuarioModel.findOne({ email })

        if(!usuario){
            return null
        }

        const senhaEncoded = createHmac('sha256', secret)
                .update(senha)
                .digest('hex')

        if (senhaEncoded != usuario.senha) {
            throw new SenhaInvalidaException('Senha inválida para esse usuário')
        }

        return usuario
    }

    gerarToken(usuario) {
        const userData = {
            kind: usuario.kind,
            id: usuario._id,
            email: usuario.email,
            senha: usuario.senha
        }

        return jwt.sign({ id: usuario.id, usuario: userData }, secret, {
            expiresIn: 86400 // 24 hours
        });
    }

}