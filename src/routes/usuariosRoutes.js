import express from "express";
import UsuarioController from "../controllers/usuariosController.js";

const UsuarioRouter = express.Router();

UsuarioRouter
    .post("/usuarios", UsuarioController.cadastrarUsuario)

export default UsuarioRouter;