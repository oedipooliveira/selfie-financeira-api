const http = require("http");
const port = 8080;

const rotas = {
    '/': 'Selfie Financeira API',
    '/home': 'Dashboard de resultados',
    '/despesas': 'Entrei na pag de despesas',
    '/receitas': 'Entrei na pag de receitas',
};

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(rotas[req.url]);
});

server.listen(port, () => {
    console.log(`Servidor escutando em http://localhost:${port}`);
});