import despesas from "../models/Despesa.js";

class DespesaController {

    static listarDespesas = (req, res) => {
        despesas.find().populate('grupo').exec().then(result => {
            res.status(200).json(result);
        }).catch(err => {
            console.error(err);
        });
    }

    static listarDespesaPorId = (req, res) => {
        const id = req.params.id;
        despesas.findById(id).populate('grupo', 'nome').then(result => {
            res.status(200).send(result);
        }).catch(err => {
            res.status(400).send({message: `${err.message} - Id da despesa não localizado.`});
        });
    }

    static listarDespesasPorGrupo = (req, res) => {
        const grupo = req.query.grupo;
        despesas.find({'grupo': grupo}).then(result => {
            res.status(200).send(result);
        }).catch(err => {
            res.status(400).send({message: `${err.message} - Despesa não localizado.`});
        });
    }

    static cadastrarDespesa = (req, res) => {
        let despesa = new despesas(req.body);
        despesa.save().then(result => {
            res.status(201).send(despesa.toJSON());
        }).catch(err => {
            res.status(500).send({message: `${err.message} - falha ao salvar a despesa.`});
        })
    }

    static atualizarDespesa = (req, res) => {
        const id = req.params.id;

        despesas.findByIdAndUpdate(id, {$set: req.body}).then(result => {
            res.status(200).send({message: 'Despesa atualizada com sucesso.'});
        }).catch(err => {
            res.status(500).send({message: `${err.message} - falha ao atualizar a despesa.`});
        });
    }

    static excluirDespesa = (req, res) => {
        const id = req.params.id;

        despesas.findByIdAndDelete(id).then(result => {
            res.status(200).send({message: 'Despesa removida com sucesso.'});
        }).catch(err => {
            res.status(500).send({message: `${err.message} - falha ao excluir a despesa.`});
        });
    }

     static totalDespesas = (req, res) => {
        despesas.aggregate([
            {
                $group: {
                    _id: null,
                    total: {$sum: "$valor"}
                }
            }
        ]).then(result => {
            const totalDespesas = result[0].total;
            res.status(200).json({ totalDespesas });
        }).catch(err => {
            res.status(500).send({message: `${err.message} - falha ao calcular o total das despesas.`});
        });
     }

}

export default DespesaController;