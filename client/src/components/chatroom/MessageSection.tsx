import React from "react";
import { User } from "../../interfaces/user";
import { Message } from "../../interfaces/message";
import { Col, Row } from "react-bootstrap";
import MessageList from "../messages/MessageList";
import SendMessageForm from "../SendMessageForm";
interface MessageSectionProps {
  userList: User[];
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  messageListRef: React.RefObject<HTMLDivElement>;
}

const MessageSection: React.FC<MessageSectionProps> = ({
  userList,
  messages,
  setMessages,
  messageListRef,
}) => {
  return (
    <div style={{ marginTop: "20px", paddingBottom: "70px" }}>
      <Row>
        <Col md={12}>
          <MessageList
            userList={userList}
            messages={messages}
            setMessages={setMessages}
            messageListRef={messageListRef}
          />
          {userList.length > 0 && (
            <SendMessageForm userList={userList} messages={messages} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default MessageSection;
