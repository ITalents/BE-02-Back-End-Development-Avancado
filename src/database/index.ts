import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

function connectToDatabase() {
  const MONGODB_URI =
    process.env.DATABASE_URL || "mongodb://localhost:27017/marketingplace";

  mongoose.set("strictQuery", true);

  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("MONGO DB CONECTADO");
    })
    .catch((err) => {
      return console.log(`Erro na conexao com o banco: ${err}`);
    });
}

export default connectToDatabase;
