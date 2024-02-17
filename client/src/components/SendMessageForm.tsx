import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { areMessagesSimilar, getRandomUser } from "../utils/utils";
import "../styles/SendMessageForm.css";
import { Message } from "../interfaces/message";
import WebSocketService from "../services/WebSocketService";
interface SendMessageFormProps {
  userList: Array<any>;
  messages: Message[];
}

const SendMessageForm: React.FC<SendMessageFormProps> = ({
  userList,
  messages,
}) => {
  const [messageContent, setMessageContent] = useState("");

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();

    const content = messageContent.trim();

    if (content !== "") {
      const randomUser = getRandomUser(userList);
      if (randomUser) {
        const message: any = {
          content,
          user: randomUser,
          messageType: "question",
        };

        handleSendMessageFormEvent(message);

        setMessageContent("");
      } else {
        console.error("No random user available");
      }
    } else {
      console.error("Message content cannot be empty");
    }
  };

  const handleSendMessageFormEvent = (event: {
    content: string;
    user: any;
    messageType: string;
  }) => {
    const { content, user, messageType } = event;
    const newContent = content;
    const message = { content: newContent, user, messageType };

    WebSocketService.sendMessage(message);

    // Check for similar messages and emit an event if it's a question
    const similarMessage = messages.some((msg) =>
      areMessagesSimilar(msg, message)
    );

    if (similarMessage && message.messageType === "question") {
      // Filter messages based on the condition
      const filteredMessages = messages.filter((msg) =>
        areMessagesSimilar(msg, message)
      );

      WebSocketService.sendAskPastMessagesMessage({
        originalMessage: message,
        filteredMessages: filteredMessages,
      });
    }
  };

  return (
    <form className="send-message-form" onSubmit={sendMessage}>
      <InputGroup className="input-group">
        <FormControl
          placeholder={"Type your question..."}
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        />
        <Button
          type="submit"
          disabled={userList.length < 1}
          variant="primary"
          className="send-message-button"
        >
          Ask <FaArrowAltCircleRight />
        </Button>
      </InputGroup>
    </form>
  );
};

export default SendMessageForm;
