import { ChatMessageSchema } from "@/types/chat.types";
import { IncomingImageMessage } from "./IncomingImageMessage";
import { IncomingMessage } from "./IncomingMessage";
import { MessageDate } from "./MessageDate";
import { MessageSystem } from "./MessageSystem";
import { OutgoingImageMessage } from "./OutgoingImageMessage";
import { OutgoingMessage } from "./OutgoingMessage";

interface ChatMessageProps {
  message: ChatMessageSchema;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  switch (message.messageType) {
    case "DATE":
      return <MessageDate message={message} />;

    case "SYSTEM":
      return <MessageSystem message={message} />;

    case "TEXT":
      return message.isMine ? (
        <OutgoingMessage message={message} />
      ) : (
        <IncomingMessage message={message} />
      );

    case "IMAGE":
      return message.isMine ? (
        <OutgoingImageMessage message={message} />
      ) : (
        <IncomingImageMessage message={message} />
      );

    default:
      return null;
  }
};

export default ChatMessage;
