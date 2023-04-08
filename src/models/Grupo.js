import mongoose from "mongoose";

const grupoSchema = new mongoose.Schema(
    {
        id: {type: String},
        nome: {type: String, required: true},
    }
);

const grupos = mongoose.model('grupos', grupoSchema);

export default grupos;