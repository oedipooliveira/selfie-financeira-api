import despesas from "../models/Despesa.js";

class DespesaController {

    static listarDespesas = (req, res) => {
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
        despesas
            .find({
                vencimento: {
                    $gte: primeiroDiaDoMes,
                    $lte: ultimoDiaDoMes
                }
            })
            .populate('grupo').exec()
            .then(result => {
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
        despesas.aggregate([
            {
                $match: {
                    vencimento: {
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
            const totalDespesas = result.length > 0 ? result[0].total : 0;
            res.status(200).json({ totalDespesas });
        }).catch(err => {
            res.status(500).send({message: `${err.message} - falha ao calcular o total das despesas.`});
        });
     }

}

export default DespesaController;