import express from "express";
import DespesaController from "../controllers/despesasController.js";

const DespesaRouter = express.Router();

DespesaRouter
    .get("/despesas", DespesaController.listarDespesas)
    .get("/despesas/busca", DespesaController.listarDespesasPorGrupo)
    .get("/despesas/total", DespesaController.totalDespesas)
    .get("/despesas/:id", DespesaController.listarDespesaPorId)
    .post("/despesas", DespesaController.cadastrarDespesa)
    .put("/despesas/:id", DespesaController.atualizarDespesa)
    .delete("/despesas/:id", DespesaController.excluirDespesa)

export default DespesaRouter;