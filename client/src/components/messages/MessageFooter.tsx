import React from "react";
import { Message } from "../../interfaces/message";

interface MessageFooterProps {
  replyingToMessageId: string | null;
  showReplyInput: boolean;
  setReplyContent: React.Dispatch<React.SetStateAction<string>>;
  handleKeyDown: (event: React.KeyboardEvent) => void;
  message: Message;
  handleReplyClick: (event: React.FormEvent, message: Message) => void;
}

const MessageFooter: React.FC<MessageFooterProps> = ({
  replyingToMessageId,
  showReplyInput,
  setReplyContent,
  handleKeyDown,
  message,
  handleReplyClick,
}) => (
  <form onSubmit={(e) => handleReplyClick(e, message)}>
    {replyingToMessageId === message.messageId && showReplyInput && (
      <textarea
        rows={3}
        placeholder={`Replying to ${message.user.username}`}
        onChange={(e) => setReplyContent(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    )}
    {message.messageType === "question" && <button type="submit">Reply</button>}
  </form>
);

export default MessageFooter;
