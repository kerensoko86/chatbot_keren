import { Message } from "../interfaces/message";
import { User } from "../interfaces/user";

export const getRandomUser = (userList: User[], originalUserId?: string) => {
  let filteredUsers: User[] = userList;
  if (originalUserId) {
    filteredUsers = userList.filter((user: any) => user._id !== originalUserId);
  }

  return filteredUsers[Math.floor(Math.random() * filteredUsers.length)];
};

export const formatTimestamp = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const getUserImage = async (gender: string) => {
  let imageNumber;
  if (gender !== "other") {
    imageNumber = Math.floor(Math.random() * 78);
    return `https://xsgames.co/randomusers/assets/avatars/${gender}/${imageNumber}.jpg`;
  } else {
    imageNumber = Math.floor(Math.random() * 53);
    return `https://xsgames.co/randomusers/assets/avatars/pixel/${imageNumber}.jpg`;
  }
};

export const findCommonWords = (
  oldMessageContent: string,
  newMessageContent: string
) => {
  const wordsInOldMessage = oldMessageContent
    .split(" ")
    .map((word) => word.toLowerCase());
  const wordsInNewMessage = newMessageContent
    .split(" ")
    .map((word) => word.toLowerCase());

  return wordsInOldMessage.filter((word) =>
    wordsInNewMessage.includes(word.toLowerCase())
  );
};

export const areMessagesSimilar = (
  oldMessage: Message,
  newMessage: Message
) => {
  if (
    oldMessage.messageType === "question" &&
    newMessage.messageType === "question"
  ) {
    const commonWords = findCommonWords(oldMessage.content, newMessage.content);
    return commonWords.length > 0;
  }
  return false;
};
