import UsuarioModel from "../model/Usuario.js"
import { createHmac } from 'crypto'
import jwt from 'jsonwebtoken'


const secret = "pwdSecretTest"

export default class RootController {

    static login(req, resp, next) {
        UsuarioModel.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                resp.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return resp.status(404).send({ message: "User Not found." });
            }

            const senhaRequest = createHmac('sha256', secret)
                .update(req.body.senha)
                .digest('hex')

            if (senhaRequest != user.senha) {
                return resp.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            const userData = {
                kind: user.kind,
                id: user._id,
                email: user.email,
                senha: user.senha
            }

            var token = jwt.sign({ id: user.id, user: userData }, secret, {
                expiresIn: 86400 // 24 hours
            });

            resp.status(200).send({
                accessToken: token
            });
        });

    }
}