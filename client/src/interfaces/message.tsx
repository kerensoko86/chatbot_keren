export interface Message {
  messageId?: string;
  content: string;
  user: {
    _id: string;
    username: string;
    imageUrl: string;
  };
  replyToQuestionId?: string;
  messageType?: string;
  gif?: string;
}
