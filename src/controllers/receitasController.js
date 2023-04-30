import receitas from "../models/Receita.js";

class ReceitaController {

    static listarReceitas = (req, res) => {
        receitas.find().populate('grupo').exec().then(result => {
            res.status(200).json(result);
        }).catch(err => {
            console.error(err);
        });
    }

    static listarReceitaPorId = (req, res) => {
        const id = req.params.id;
        receitas.findById(id).populate('grupo', 'nome').then(result => {
            res.status(200).send(result);
        }).catch(err => {
            res.status(400).send({message: `${err.message} - Id da receita não localizado.`})
        });
    }

    static listarReceitasPorGrupo = (req, res) => {
        const grupo = req.query.grupo;
        receitas.find({'grupo': grupo}).then(result => {
            res.status(200).send(result);
        }).catch(err => {
            res.status(400).send({message: `${err.message} - Receita não localizado.`})
        });
    }

    static cadastrarReceita = (req, res) => {
        let receita = new receitas(req.body);
        receita.save().then(result => {
            res.status(201).send(receita.toJSON());
        }).catch(err => {
            res.status(500).send({message: `${err.message} - falha ao salvar a receita.`})
        })
    }

    static atualizarReceita = (req, res) => {
        const id = req.params.id;

        receitas.findByIdAndUpdate(id, {$set: req.body}).then(result => {
            res.status(200).send({message: 'Receita atualizada com sucesso.'});
        }).catch(err => {
            res.status(500).send({message: `${err.message} - falha ao atualizar a receita.`})
        });
    }

    static excluirReceita = (req, res) => {
        const id = req.params.id;

        receitas.findByIdAndDelete(id).then(result => {
            res.status(200).send({message: 'Receita removida com sucesso.'})
        }).catch(err => {
            res.status(500).send({message: `${err.message} - falha ao excluir a receita.`})
        });
    }

    static totalReceitas = (req, res) => {
        receitas.aggregate([
            {
                $group: {
                    _id: null,
                    total: {$sum: "$valor"}
                }
            }
        ]).then(result => {
            const totalReceitas = result[0].total;
            res.status(200).json({ totalReceitas });
        }).catch(err => {
            res.status(500).send({message: `${err.message} - falha ao calcular o total das receitas.`});
        });
     }

}

export default ReceitaController;