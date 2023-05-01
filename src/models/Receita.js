import mongoose from "mongoose";

const receitaSchema = new mongoose.Schema(
    {
        id: {type: String},
        descricao: {type: String, required: true},
        valor: {type: Number, required: true},
        recebimento: {type: Date, required: true},
        grupo: {type: mongoose.Schema.Types.ObjectId, ref: 'grupos', required: false},
        formaRecebimento: {type: String, required: false},
    }
);

const receitas = mongoose.model('receitas', receitaSchema);

export default receitas;