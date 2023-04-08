import despesas from "../models/Despesa.js";

class DespesaController {

    static listarDespesas = (req, res) => {
        despesas.find().then(result => {
            res.status(200).json(result);
        }).catch(err => {
            console.error(err);
        });
    }

    static listarDespesaPorId = (req, res) => {
        const id = req.params.id;
        despesas.findById(id).then(result => {
            res.status(200).send(result);
        }).catch(err => {
            res.status(400).send({message: `${err.message} - Id da despesa não localizado.`})
        });
    }

    static cadastrarDespesa = (req, res) => {
        let despesa = new despesas(req.body);
        despesa.save().then(result => {
            res.status(201).send(despesa.toJSON());
        }).catch(err => {
            res.status(500).send({message: `${err.message} - falha ao salvar a despesa.`})
        })
    }

    static atualizarDespesa = (req, res) => {
        const id = req.params.id;

        despesas.findByIdAndUpdate(id, {$set: req.body}).then(result => {
            res.status(200).send({message: 'Despesa atualizada com sucesso.'});
        }).catch(err => {
            res.status(500).send({message: `${err.message} - falha ao atualizar a despesa.`})
        });
    }

    static excluirDespesa = (req, res) => {
        const id = req.params.id;

        despesas.findByIdAndDelete(id).then(result => {
            res.status(200).send({message: 'Despesa removida com sucesso.'})
        }).catch(err => {
            res.status(500).send({message: `${err.message} - falha ao excluir a despesa.`})
        });
    }

}

export default DespesaController;