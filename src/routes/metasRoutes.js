import express from "express";
import MetaController from "../controllers/metasController.js";

const MetaRouter = express.Router();

MetaRouter
    .get("/metas", MetaController.listarMetas)
    .get("/metas/:id", MetaController.listarMetaPorId)
    .post("/metas", MetaController.cadastrarMeta)
    .put("/metas/:id", MetaController.atualizarMeta)
    .delete("/metas/:id", MetaController.excluirMeta)

export default MetaRouter;