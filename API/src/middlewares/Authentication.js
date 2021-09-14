import jwt from 'jsonwebtoken'

export default class Authentication {
    
    static authentication(req, res, next) {

        const secret = "pwdSecretTest"
    
        let authorization = req.headers["authorization"];

        if (!authorization) {
          return res.status(403).send({ message: "No token provided!" });
        }

        const token = authorization.split(' ')[1];
      
        jwt.verify(token, secret, (err, decoded) => {
          if (err) {
            console.log(err)
            return res.status(401).send({ message: "Unauthorized!" });
          }
          req.userId = decoded.id;
          req.usuario = decoded.usuario;
          next();
        });
      };

    static authorization(roles){
        return (req, res, next) => {
          if(!roles.includes(req.usuario.kind)){
              return res.status(401).send({ message: `Usuário ${req.usuario.kind} não tem acesso ao recurso` });
          }
          next();
        }
    }
}
