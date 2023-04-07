import express from "express";

const app = express();
app.use(express.json());

const despesas = [
    {id: 1, descricao: "Luz", valor: 168.01},
    {id: 2, descricao: "Água", valor: 172.58}
];

app.get('/', (req, res) => {
    res.status(200).send('Selfie Financeira - API');
});

app.get('/despesas', (req, res) => {
    res.status(200).json(despesas);
});

app.get('/despesas/:id', (req, res) => {
    let index = buscaIndiceDespesaPorId(req.params.id);
    res.json(despesas[index]);
});

app.post('/despesas', (req, res) => {
    despesas.push(req.body);
    res.status(201).send('Despesa cadastrada com sucesso');
});

app.put('/despesas/:id', (req, res) => {
    let index = buscaIndiceDespesaPorId(req.params.id);
    despesas[index].descricao = req.body.descricao;
    despesas[index].valor = req.body.valor;
    res.json(despesas);
});

app.delete('/despesas/:id', (req, res) => {
    let {id} = req.params;
    let index = buscaIndiceDespesaPorId(id);
    despesas.splice(index, 1);
    res.send(`Despesa ${id} removida com sucesso`);
});

function buscaIndiceDespesaPorId(id) {
    return despesas.findIndex(desp => desp.id == id);
}

export default app;