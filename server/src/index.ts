import express from "express";
import http from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { handleChat } from "./controllers/chat.controller";
import { handleConnection } from "./controllers/user.controller";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
> = http.createServer(app);

export const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

io.on("connection", (socket: Socket) => {
  handleConnection(socket);

  handleChat(socket);
});

const PORT = process.env.PORT || 3000;
server
  .listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.error("Server failed to start:", err);
  });
