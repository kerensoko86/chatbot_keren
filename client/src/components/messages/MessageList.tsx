import React, { useRef, useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import WebSocketService from "../../services/WebSocketService";
import { getRandomUser } from "../../utils/utils";
import { Message } from "../../interfaces/message";
import { User } from "../../interfaces/user";
import MessageListItem from "./MessageListItem";
import "../../styles/MessageList.css";

interface MessageListProps {
  userList: Array<User>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  messageListRef: React.MutableRefObject<HTMLDivElement | null>;
}

const MessageList: React.ForwardRefRenderFunction<
  HTMLDivElement,
  MessageListProps
> = ({ userList, messages, setMessages, messageListRef }) => {
  const [replyContent, setReplyContent] = useState("");
  const [replyingToMessageId, setReplyingToMessageId] = useState<string | null>(
    null
  );
  const [showReplyInput, setShowReplyInput] = useState<boolean>(false);

  useEffect(() => {
    const handleMessage = (message: Message) => {
      setMessages((prevMessages: Message[]) => [...prevMessages, message]);
    };
    WebSocketService.onMessage(handleMessage);

    return () => {
      WebSocketService.offMessage();
    };
  }, []);

  useEffect(() => {
    if (messageListRef.current) {
      const container = messageListRef.current;
      const isScrolledToBottom =
        container.scrollHeight - container.clientHeight <=
        container.scrollTop + 1;

      if (!isScrolledToBottom) {
        const lastMessage = messageListRef.current
          .lastElementChild as HTMLElement;

        if (lastMessage) {
          lastMessage.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, [messages, messageListRef]);
  const handleReplyClick = (event: any, message: Message) => {
    event.preventDefault();
    setShowReplyInput(true);

    if (message.user && message.user._id) {
      setReplyingToMessageId(message.messageId || null);
      if (message.messageId && message.content && showReplyInput) {
        const randomUser = getRandomUser(userList, message.user._id);

        const replyMessage: Message = {
          content: replyContent,
          user: randomUser,
          messageType: "answer",
          replyToQuestionId: message.messageId,
        };

        WebSocketService.sendMessage(replyMessage);

        setShowReplyInput(false);
      }
    }
    setReplyContent("");
  };

  const handleKeyDown = (event: any, message: Message) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleReplyClick(event, message);
    }
  };

  return (
    <div
      className="chat-thread"
      ref={(el) => {
        if (el) {
          messageListRef.current = el;
          el.scrollTop = el.scrollHeight;
        }
      }}
    >
      <ListGroup>
        {messages.map((message) => (
          <MessageListItem
            key={message.messageId}
            message={message}
            handleReplyClick={handleReplyClick}
            replyingToMessageId={replyingToMessageId}
            showReplyInput={showReplyInput}
            messages={messages}
            setReplyContent={setReplyContent}
            handleKeyDown={handleKeyDown}
          />
        ))}
      </ListGroup>
    </div>
  );
};

export default React.forwardRef(MessageList);
