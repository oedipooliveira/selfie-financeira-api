import mongoose from "mongoose";

const despesaSchema = new mongoose.Schema(
    {
        id: {type: String},
        descricao: {type: String, required: true},
        valor: {type: Number, required: true}
    }
);

const despesas = mongoose.model('despesas', despesaSchema);

export default despesas;