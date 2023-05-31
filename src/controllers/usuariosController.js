import usuarios from "../models/Usuario.js";
import jwt from "jsonwebtoken";

class UsuarioController {

    static createToken = (payload, expiresIn = '12h') => {
        const SECRET_KEY = '123456789';
        return jwt.sign(payload, SECRET_KEY, { expiresIn })
    }

    static verifyToken = (token) => {
        const SECRET_KEY = '123456789';
        return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err)
    }

    static logar = (req, res) => {
        let { email, senha } = req.body;
        usuarios.findOne({ email, senha }).then(result => {
            let access_token = UsuarioController.createToken({ email, senha })
            res.status(200).send({ access_token });
        }).catch(err => {
            res.status(400).send({message: `${err.message} - Usuário não localizado.`});
        });
    }

    static cadastrarUsuario = (req, res) => {
        let usuario = new usuarios(req.body);
        usuario.save().then(result => {
            res.status(201).send(usuario.toJSON());
        }).catch(err => {
            res.status(500).send({message: `${err.message} - falha ao salvar o usuário.`})
        })
    }

}

export default UsuarioController;