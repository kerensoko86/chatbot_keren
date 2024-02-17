export interface Message {
  messageId: string;
  content: string;
  timestamp: Date;
  messageType: string;
  replyToQuestionId?: string;
  gif?: string;
  user?: {
    _id?: string;
    username: string;
    imageUrl: string;
  };
}
