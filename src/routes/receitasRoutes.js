import express from "express";
import ReceitaController from "../controllers/receitasController.js";

const ReceitaRouter = express.Router();

ReceitaRouter
    .get("/receitas", ReceitaController.listarReceitas)
    .get("/receitas/busca", ReceitaController.listarReceitasPorGrupo)
    .get("/receitas/total", ReceitaController.totalReceitas)
    .get("/receitas/:id", ReceitaController.listarReceitaPorId)
    .post("/receitas", ReceitaController.cadastrarReceita)
    .put("/receitas/:id", ReceitaController.atualizarReceita)
    .delete("/receitas/:id", ReceitaController.excluirReceita)

export default ReceitaRouter;