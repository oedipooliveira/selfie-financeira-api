import mongoose from "mongoose";

mongoose.connect("mongodb+srv://edipojoseoliveira:v1ZrpQFhglq1iXCZ@selfiefinanceiradb.abyg71t.mongodb.net/?retryWrites=true&w=majority");

let db = mongoose.connection;

export default db;