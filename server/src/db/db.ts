import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const client = new MongoClient(process.env.MONGO_URI || "");
export const dbName: string = "chatbot";
export const collectionName: string = "users";

export const connectToDatabase: () => Promise<any> = async () => {
  try {
    await client.connect();
    const db: Db = client.db(dbName);

    console.log("Connected to the database", new Date());
    return db;
  } catch (err) {
    console.error("Error connecting to the database", err);
  }
};

export const getCollection: () => Promise<any> = async () => {
  try {
    const db: any | undefined = await connectToDatabase();
    if (db) return db.collection(collectionName);
  } catch (err) {
    console.error("Error connecting to the database", err);
  }
};
