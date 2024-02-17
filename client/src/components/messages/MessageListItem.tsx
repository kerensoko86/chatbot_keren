import React from "react";
import { ListGroup } from "react-bootstrap";
import { Message } from "../../interfaces/message";
import { formatTimestamp } from "../../utils/utils";
import MessageContent from "./MessageContent";
import UserAvatar from "./UserAvatar";
import MessageFooter from "./MessageFooter";
import "../../styles/MessageListItem.css";

interface MessageListItemProps {
  message: Message;
  handleReplyClick: (event: React.FormEvent, message: Message) => void;
  replyingToMessageId: string | null;
  showReplyInput: boolean;
  messages: Message[];
  setReplyContent: React.Dispatch<React.SetStateAction<string>>;
  handleKeyDown: (event: React.KeyboardEvent, message: Message) => void;
}
const MessageListItem: React.FC<MessageListItemProps> = ({
  message,
  handleReplyClick,
  replyingToMessageId,
  showReplyInput,
  messages,
  setReplyContent,
  handleKeyDown,
}) => {
  return (
    <ListGroup.Item
      key={message.messageId}
      className={`d-flex align-items-start `}
      id="list-group-item"
    >
      <UserAvatar
        imageUrl={message.user.imageUrl}
        alt={`${message.user.username}'s avatar`}
      />
      <div>
        <div className="username">{message.user.username}</div>
        <div className="display-flex-row">
          <MessageContent message={message} messages={messages} />
          <div className="timestamp">{formatTimestamp()}</div>
        </div>
        <div>
          <MessageFooter
            replyingToMessageId={replyingToMessageId}
            showReplyInput={showReplyInput}
            setReplyContent={setReplyContent}
            handleKeyDown={(e) => handleKeyDown(e, message)}
            message={message}
            handleReplyClick={handleReplyClick}
          />
        </div>
      </div>
    </ListGroup.Item>
  );
};

export default MessageListItem;
