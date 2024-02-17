import { Message } from "./message";

export interface User {
  imageUrl: string;
  messages: Message[];
  username: string;
  _id: string;
}
