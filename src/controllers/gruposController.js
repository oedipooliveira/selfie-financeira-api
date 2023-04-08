import grupos from "../models/Grupo.js";

class GrupoController {

    static listarGrupos = (req, res) => {
        grupos.find().then(result => {
            res.status(200).json(result);
        }).catch(err => {
            console.error(err);
        });
    }

    static listarGrupoPorId = (req, res) => {
        const id = req.params.id;
        grupos.findById(id).then(result => {
            res.status(200).send(result);
        }).catch(err => {
            res.status(400).send({message: `${err.message} - Id do grupo não localizado.`})
        });
    }

    static cadastrarGrupo = (req, res) => {
        let grupo = new grupos(req.body);
        grupo.save().then(result => {
            res.status(201).send(grupo.toJSON());
        }).catch(err => {
            res.status(500).send({message: `${err.message} - falha ao salvar o grupo.`})
        })
    }

    static atualizarGrupo = (req, res) => {
        const id = req.params.id;

        grupos.findByIdAndUpdate(id, {$set: req.body}).then(result => {
            res.status(200).send({message: 'Grupo atualizada com sucesso.'});
        }).catch(err => {
            res.status(500).send({message: `${err.message} - falha ao atualizar o grupo.`})
        });
    }

    static excluirGrupo = (req, res) => {
        const id = req.params.id;

        grupos.findByIdAndDelete(id).then(result => {
            res.status(200).send({message: 'Grupo removido com sucesso.'})
        }).catch(err => {
            res.status(500).send({message: `${err.message} - falha ao excluir o grupo.`})
        });
    }

}

export default GrupoController;