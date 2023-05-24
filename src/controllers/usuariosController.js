import usuarios from "../models/Usuario.js";

class UsuarioController {

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