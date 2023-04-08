import express from "express";
import DespesaRouter from "./despesasRoutes.js";
import GrupoRouter from "./gruposRoutes.js";

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({titulo: 'Selfie Financeira'})
    });

    app.use(
        express.json(),
        DespesaRouter,
        GrupoRouter
    );
}

export default routes;