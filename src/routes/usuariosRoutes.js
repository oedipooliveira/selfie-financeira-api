import express from "express";
import UsuarioController from "../controllers/usuariosController.js";

const UsuarioRouter = express.Router();

UsuarioRouter
    .post("/usuarios", UsuarioController.cadastrarUsuario)
    .post("/logar", UsuarioController.logar)

export default UsuarioRouter;