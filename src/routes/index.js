import express from "express";
import cors from 'cors';
import DespesaRouter from "./despesasRoutes.js";
import ReceitaRouter from "./receitasRoutes.js";
import GrupoRouter from "./gruposRoutes.js";
import MetaRouter from "./metasRoutes.js";
import UsuarioRouter from "./usuariosRoutes.js";

const routes = (app) => {
    app.use((req, res, next) => {
        if (['/usuarios', '/logar'].some(path => req.path.includes(path)) === false && req.method !== 'OPTIONS') {
            if (req.headers.authorization === undefined || !req.headers.authorization.startsWith('Bearer ')) {
                const status = 401;
                const message = 'Token inválido';
                res.status(status).json({ status, message });
                return;
            }
        }
        next();
    });

    app.use(cors());
    
    app.route('/').get((req, res) => {
        res.status(200).send({titulo: 'Selfie Financeira'})
    });

    app.use(
        express.json(),
        DespesaRouter,
        ReceitaRouter,
        GrupoRouter,
        MetaRouter,
        UsuarioRouter
    );
}

export default routes;