import React from "react";
import { Message } from "../../interfaces/message";
import "../../styles/MessageContent.css";

interface MessageContentProps {
  message: Message;
  messages: Message[];
}

const MessageContent: React.FC<MessageContentProps> = ({
  message,
  messages,
}) => (
  <div
    className={`message-container ${
      message.messageType === "question"
        ? "question-message"
        : message.messageType === "answer"
        ? "answer-message"
        : "other-message"
    }`}
  >
    {message.replyToQuestionId && (
      <div className="content">
        {
          messages.find((msg) => msg.messageId === message.replyToQuestionId)
            ?.content
        }
      </div>
    )}
    {message.content}
    {"  "}
    {message.gif && (
      <img src={message.gif} className="gif-container" alt="gif" />
    )}
  </div>
);

export default MessageContent;
