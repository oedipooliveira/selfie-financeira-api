import mongoose from "mongoose";

const metaSchema = new mongoose.Schema(
    {
        id: {type: String},
        valor: {type: Number, required: true},
        valorGuardado: {type: Number, required: true},
        data: {type: Date, required: true},
        nome: {type: String, required: true},
        motivo: {type: String, required: true},
    }
);

const metas = mongoose.model('metas', metaSchema);

export default metas;