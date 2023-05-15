import receitas from "../models/Receita.js";

class ReceitaController {

    static listarReceitas = (req, res) => {
        // String com o mês e ano (exemplo: "Maio/2023")
        const mesAnoString = req.query.periodo;

        // Obter o mês e o ano da string
        const partes = mesAnoString.split("/");
        const mesString = partes[0]; // "Maio"
        const anoString = partes[1]; // "2023"

        // Mapear o nome do mês para um número
        const meses = {
            "Janeiro": 1,
            "Fevereiro": 2,
            "Março": 3,
            "Abril": 4,
            "Maio": 5,
            "Junho": 6,
            "Julho": 7,
            "Agosto": 8,
            "Setembro": 9,
            "Outubro": 10,
            "Novembro": 11,
            "Dezembro": 12
        };

        // Converter o nome do mês para um número
        const mesNumero = meses[mesString];

        // Verificar se o mês é válido
        if (!mesNumero) {
          mesNumero = 1;
        }

        // Converter o ano e mês para um objeto Date
        const primeiroDiaDoMes = new Date(anoString, mesNumero - 1, 0);
        const ultimoDiaDoMes = new Date(anoString, mesNumero, 0);

        // Consulta de agregação para buscar as despesas do mês
        receitas
            .find({
                recebimento: {
                    $gte: primeiroDiaDoMes.toISOString(),
                    $lte: ultimoDiaDoMes.toISOString()
                }
            })
            .populate('grupo').exec()
            .then(result => {
                console.log(result);
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
        // String com o mês e ano (exemplo: "Maio/2023")
        const mesAnoString = req.query.periodo;

        // Obter o mês e o ano da string
        const partes = mesAnoString.split("/");
        const mesString = partes[0]; // "Maio"
        const anoString = partes[1]; // "2023"

        // Mapear o nome do mês para um número
        const meses = {
            "Janeiro": 1,
            "Fevereiro": 2,
            "Março": 3,
            "Abril": 4,
            "Maio": 5,
            "Junho": 6,
            "Julho": 7,
            "Agosto": 8,
            "Setembro": 9,
            "Outubro": 10,
            "Novembro": 11,
            "Dezembro": 12
        };

        // Converter o nome do mês para um número
        const mesNumero = meses[mesString];

        // Verificar se o mês é válido
        if (!mesNumero) {
          mesNumero = 1;
        }

        // Converter o ano e mês para um objeto Date
        const primeiroDiaDoMes = new Date(anoString, mesNumero - 1, 0);
        const ultimoDiaDoMes = new Date(anoString, mesNumero, 0);

        // Consulta de agregação para buscar as despesas do mês
        receitas.aggregate([
            {
                $match: {
                    recebimento: {
                        $gte: primeiroDiaDoMes,
                        $lte: ultimoDiaDoMes
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: {$sum: "$valor"}
                }
            }
        ]).then(result => {
            const totalReceitas = result.length > 0 ? result[0].total : 0;
            res.status(200).json({ totalReceitas });
        }).catch(err => {
            res.status(500).send({message: `${err.message} - falha ao calcular o total das receitas.`});
        });
     }

}

export default ReceitaController;