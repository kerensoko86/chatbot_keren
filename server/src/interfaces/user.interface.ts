import { ObjectId } from "mongodb";
import { Message } from "./message.interface";

export interface User {
  _id: ObjectId;
  username: string;
  imageUrl: string;
  messages: Array<Message>;
}
