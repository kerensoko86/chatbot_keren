import { io, Socket } from "socket.io-client";

const url = "http://localhost:4000";
const createSocket = (): Socket => {
  return io(url);
};

export default createSocket;
