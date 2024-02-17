import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import JoinChatSection from "./JoinChatSection";
import MessageSection from "./MessageSection";
import "../../index.css";
import WebSocketService from "../../services/WebSocketService";
import { Message } from "../../interfaces/message";
import { User } from "../../interfaces/user";

const ChatRoom: React.FC = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const messageListRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const socket = WebSocketService.socket;

    if (socket) {
      socket.on("refresh-response", (data: any) => {
        console.log(data.message);
      });
    }
  }, []);

  return (
    <Container fluid className="mt-5">
      <JoinChatSection setUserList={setUserList} userList={userList} />

      <MessageSection
        messageListRef={messageListRef}
        userList={userList}
        messages={messages}
        setMessages={setMessages}
      />
    </Container>
  );
};

export default ChatRoom;
