import express from "express";
import GrupoController from "../controllers/gruposController.js";

const GrupoRouter = express.Router();

GrupoRouter
    .get("/grupos", GrupoController.listarGrupos)
    .get("/grupos/:id", GrupoController.listarGrupoPorId)
    .post("/grupos", GrupoController.cadastrarGrupo)
    .put("/grupos/:id", GrupoController.atualizarGrupo)
    .delete("/grupos/:id", GrupoController.excluirGrupo)

export default GrupoRouter;