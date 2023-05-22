import usuarios from "../models/Usuario.js";

class UsuarioController {

    static listarUsuarios = (req, res) => {
        usuarios.find().then(result => {
            res.status(200).json(result);
        }).catch(err => {
            console.error(err);
        });
    }

    static listarUsuarioPorId = (req, res) => {
        const id = req.params.id;
        usuarios.findById(id).then(result => {
            res.status(200).send(result);
        }).catch(err => {
            res.status(400).send({message: `${err.message} - Id do usuário não localizado.`})
        });
    }

    static cadastrarUsuarios = (req, res) => {
        let usuario = new usuarios(req.body);
        usuario.save().then(result => {
            res.status(201).send(usuario.toJSON());
        }).catch(err => {
            res.status(500).send({message: `${err.message} - falha ao salvar o usuário.`})
        })
    }

    static atualizarUsuario = (req, res) => {
        const id = req.params.id;

        usuarios.findByIdAndUpdate(id, {$set: req.body}).then(result => {
            res.status(200).send({message: 'Usuário atualizado com sucesso.'});
        }).catch(err => {
            res.status(500).send({message: `${err.message} - falha ao atualizar o usuário.`})
        });
    }

    static excluirUsuario = (req, res) => {
        const id = req.params.id;

        usuarios.findByIdAndDelete(id).then(result => {
            res.status(200).send({message: 'Usuário removido com sucesso.'})
        }).catch(err => {
            res.status(500).send({message: `${err.message} - falha ao excluir o usuário.`})
        });
    }

}

export default UsuarioController;