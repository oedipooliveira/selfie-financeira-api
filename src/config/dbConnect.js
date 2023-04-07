import mongoose from "mongoose";

mongoose.connect("mongodb+srv://edipojoseoliveira:94.Gr,Ed@selfiefinanceiradb.abyg71t.mongodb.net/?retryWrites=true&w=majority");

let db = mongoose.connection;

export default db;