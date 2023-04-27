import express from "express";
import cors from 'cors';
import DespesaRouter from "./despesasRoutes.js";
import ReceitaRouter from "./receitasRoutes.js";
import GrupoRouter from "./gruposRoutes.js";

const routes = (app) => {
    app.use(cors());
    
    app.route('/').get((req, res) => {
        res.status(200).send({titulo: 'Selfie Financeira'})
    });

    app.use(
        express.json(),
        DespesaRouter,
        ReceitaRouter,
        GrupoRouter
    );
}

export default routes;