import mongoose from "mongoose";
import "dotenv/config";

class ConnectToMongoDb {
  async execute() {
    const mongoUrl = process.env.DATABASE_URL as string;

    try {
      await mongoose.connect(mongoUrl);
      console.log("MONGODB CONECTADO");
    } catch (error: any) {
      console.log(error.message);
    }
  }
}

export default new ConnectToMongoDb();
