import express from "express";
import UsuarioController from "../controllers/usuariosController.js";

const UsuarioRouter = express.Router();

UsuarioRouter
    .get("/usuarios", UsuarioController.listarUsuarios)
    .get("/usuarios/:id", UsuarioController.listarUsuarioPorId)
    .post("/usuarios", UsuarioController.cadastrarUsuario)
    .put("/usuarios/:id", UsuarioController.atualizarUsuario)
    .delete("/usuarios/:id", UsuarioController.excluirUsuario)

export default UsuarioRouter;