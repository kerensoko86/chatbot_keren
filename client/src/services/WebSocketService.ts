import { Socket, io } from "socket.io-client";
import { Message } from "../interfaces/message";

export class WebSocketService {
  socket: Socket;
  static socket: any;

  constructor() {
    this.socket = io("http://localhost:4000", {
      extraHeaders: {
        "Access-Control-Allow-Origin": "*",
      },
    });

    this.socket.on("connect", () => {
      console.log("Connected to the server");
      this.socket.emit("page-refresh");
    });
  }

  sendMessage(message: Message) {
    this.socket.emit("message", JSON.stringify(message));
  }

  sendAskPastMessagesMessage(data: any) {
    this.socket.emit("ask-past-messages", data);
  }
  joinChat(user: any) {
    this.socket.emit("join", user);
  }

  onMessage(callback: (message: Message) => void) {
    this.socket.on("message", (data) => {
      if (typeof data === "object") {
        const message = {
          user: {
            username: data.user.username,
            imageUrl: data.user.imageUrl || "",
            _id: data.user._id,
          },
          content: data.content || "",
          gif: data.gif || "",
          messageType: data.messageType || "",
          messageId: data.messageId,
          replyToQuestionId: data.replyToQuestionId || null,
        };
        callback(message);
      } else {
        try {
          const parsedData = JSON.parse(data);
          callback(parsedData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    });
  }

  offMessage() {
    this.socket.off("message");
  }
  sendPageRefresh = async () => {
    return new Promise<void>((resolve, reject) => {
      this.socket.emit("page-refresh", (response: any) => {
        if (response.success) {
          resolve();
        } else {
          reject(new Error("Failed to send page refresh"));
        }
      });
    });
  };
}

const instance = new WebSocketService();
export default instance;
