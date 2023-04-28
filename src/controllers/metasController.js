import metas from "../models/Meta.js";

class MetaController {

    static listarMetas = (req, res) => {
        metas.find().then(result => {
            res.status(200).json(result);
        }).catch(err => {
            console.error(err);
        });
    }

    static listarMetaPorId = (req, res) => {
        const id = req.params.id;
        metas.findById(id).then(result => {
            res.status(200).send(result);
        }).catch(err => {
            res.status(400).send({message: `${err.message} - Id do meta não localizado.`})
        });
    }

    static cadastrarMeta = (req, res) => {
        let meta = new metas(req.body);
        meta.save().then(result => {
            res.status(201).send(meta.toJSON());
        }).catch(err => {
            res.status(500).send({message: `${err.message} - falha ao salvar o meta.`})
        })
    }

    static atualizarMeta = (req, res) => {
        const id = req.params.id;

        metas.findByIdAndUpdate(id, {$set: req.body}).then(result => {
            res.status(200).send({message: 'Meta atualizada com sucesso.'});
        }).catch(err => {
            res.status(500).send({message: `${err.message} - falha ao atualizar o meta.`})
        });
    }

    static excluirMeta = (req, res) => {
        const id = req.params.id;

        metas.findByIdAndDelete(id).then(result => {
            res.status(200).send({message: 'Meta removido com sucesso.'})
        }).catch(err => {
            res.status(500).send({message: `${err.message} - falha ao excluir o meta.`})
        });
    }

}

export default MetaController;