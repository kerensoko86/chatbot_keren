import { Message } from "../interfaces/message.interface";
import { User } from "../interfaces/user.interface";
import { getModifiedAnswer } from "../services/ai21.service";

export const calculateMatchingPercentage = (
  similarMessageContent: string[],
  messageContent: string[]
): number => {
  const matchingWords = similarMessageContent.filter((word: string) =>
    messageContent.includes(word.toLowerCase())
  );

  return (matchingWords.length / similarMessageContent.length) * 100;
};

export const filterSimilarQuestions = (
  originalMessageId: string,
  originalMessageContent: string,
  filteredMessages: Message[]
): Message[] => {
  const similarMessageContent = originalMessageContent.split(" ");

  return filteredMessages.filter((message: Message) => {
    if (
      message.messageType === "question" &&
      message.messageId !== originalMessageId
    ) {
      const messageContent = message.content.split(" ");
      const matchingPercentage = calculateMatchingPercentage(
        similarMessageContent,
        messageContent
      );

      return matchingPercentage >= 66;
    }
    return false;
  });
};

export const filterAnswers = (allUsers: User[], matchingQuestions: any) => {
  return allUsers.flatMap((user) => {
    return user.messages.filter((message) => {
      return (
        message.messageType === "answer" &&
        matchingQuestions.some(
          (question: Message) =>
            question.messageId === message.replyToQuestionId
        )
      );
    });
  });
};

export const getRandomQuestion = (
  matchingQuestions: Message[]
): Message | null => {
  if (matchingQuestions.length === 0) {
    return null;
  }

  const randomQuestionIndex = Math.floor(
    Math.random() * matchingQuestions.length
  );
  return matchingQuestions[randomQuestionIndex];
};

export const getRandomAnswer = async (
  matchingAnswers: Message[]
): Promise<Message | null> => {
  if (matchingAnswers.length === 0) {
    return null;
  }

  const randomAnswerIndex = Math.floor(Math.random() * matchingAnswers.length);
  const randomMatchingAnswer = matchingAnswers[randomAnswerIndex];
  const modifiedAnswer = await getModifiedAnswer(randomMatchingAnswer.content);

  return modifiedAnswer;
};
