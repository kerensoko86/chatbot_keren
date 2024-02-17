import { Socket } from "socket.io";
import { io } from "../index";
import {
  addMessage,
  deleteAllusers,
  loadUserData,
} from "../services/user.service";
import { v4 as uuidv4 } from "uuid";
import { Message } from "../interfaces/message.interface";
import { getModifiedAnswer } from "../services/ai21.service";
import { BOT, getBotResponse } from "../services/bot.service";
import {
  filterAnswers,
  filterSimilarQuestions,
  getRandomAnswer,
  getRandomQuestion,
} from "../utils/filtering";

export async function handleChat(socket: Socket) {
  socket.on("message", async (data: string) => {
    const { content, user, messageType, replyToQuestionId } = JSON.parse(data);
    const messageId = uuidv4();

    await addMessage(user, {
      messageId,
      content,
      timestamp: new Date(),
      messageType,
      replyToQuestionId: replyToQuestionId,
    });

    io.emit("message", {
      messageId,
      content,
      user: {
        _id: user._id,
        username: user.username,
        imageUrl: user.imageUrl,
      },
      messageType,
      replyToQuestionId,
    });
  });

  socket.on(
    "ask-past-messages",
    async ({ originalMessage, filteredMessages }) => {
      try {
        const allUsers = await loadUserData();
        const matchingQuestions = filterSimilarQuestions(
          originalMessage.messageId,
          originalMessage.content,
          filteredMessages
        );

        const matchingAnswers = filterAnswers(allUsers, matchingQuestions);

        const randomMatchingQuestion = getRandomQuestion(matchingQuestions);

        if (matchingQuestions.length > 0 && matchingAnswers.length > 0) {
          const modifiedAnswer: any | null = await getRandomAnswer(
            matchingAnswers
          );

          io.to(socket.id).emit("message", {
            content: `Someone already asked this: "${originalMessage.content}" right here: "${randomMatchingQuestion?.content}". Can't you check?!`,
            user: {
              username: BOT.username,
              imageUrl: BOT.imageUrl,
              _id: BOT._id,
            },
            gif: await getBotResponse(`annoyed`),
          });

          const generatedText = modifiedAnswer?.completions?.[0]?.data?.text;

          io.to(socket.id).emit("message", {
            content: `Here is your response genious: "${generatedText}"`,
            user: {
              username: BOT.username,
              imageUrl: BOT.imageUrl,
              _id: BOT._id,
            },
          });
        } else if (matchingQuestions.length > 0) {
          io.to(socket.id).emit("message", {
            content: `Someone already asked something similar to "${originalMessage.content}" here -"${randomMatchingQuestion?.content}" and no one bothered to answer`,
            user: {
              username: BOT.username,
              imageUrl: BOT.imageUrl,
              _id: BOT._id,
            },
            gif: await getBotResponse(`laughing`),
          });
        }
      } catch (error) {
        console.error("Error fetching past messages from MongoDB:", error);
      }
    }
  );

  socket.on("page-refresh", async () => {
    await deleteAllusers();
    socket.emit("refresh-response", {
      message: "Server has processed the page refresh",
    });
  });
}
