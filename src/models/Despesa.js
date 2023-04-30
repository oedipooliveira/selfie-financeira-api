import mongoose from "mongoose";

const despesaSchema = new mongoose.Schema(
    {
        id: {type: String},
        descricao: {type: String, required: true},
        valor: {type: Number, required: true},
        vencimento: {type: Date, required: true},
        grupo: {type: mongoose.Schema.Types.ObjectId, ref: 'grupos', required: true},
        formaPagamento: {type: String, required: false},
    }
);

const despesas = mongoose.model('despesas', despesaSchema);

export default despesas;