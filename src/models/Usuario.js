import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
    {
        id: {type: String},
        email: {type: String, required: true},
        nome: {type: String, required: true},
        senha: {type: String, required: true},
    }
);

const usuarios = mongoose.model('usuarios', usuarioSchema);

export default usuarios;