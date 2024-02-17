import { Socket } from "socket.io";
import { io } from "../index";
import { addUser, loadUserData } from "../services/user.service";
import { BOT } from "../services/bot.service";

export const handleConnection = (socket: Socket) => {
  socket.on("join", async (user) => {
    await addUser(user);
    io.emit("message", {
      user: {
        username: BOT.username,
        imageUrl: BOT.imageUrl,
        _id: BOT._id,
      },
      content: `${user.username} joined the chat`,
    });

    const updatedUserList = await loadUserData();

    io.emit("userList", updatedUserList);
  });
};
