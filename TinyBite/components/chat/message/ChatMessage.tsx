import { ChatMessage } from "@/types/chat";
import { IncomingImageMessage } from "./IncomingImageMessage";
import { IncomingMessage } from "./IncomingMessage";
import { MessageDate } from "./MessageDate";
import { MessageSystem } from "./MessageSystem";
import { OutgoingImageMessage } from "./OutgoingImageMessage";
import { OutgoingMessage } from "./OutgoingMessage";

export function formatTime(iso: string) {
  const date = new Date(iso);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

interface ChatMessageComponentProps {
  message: ChatMessage;
  myUserId: number;
}

const ChatMessageComponent = ({
  message,
  myUserId,
}: ChatMessageComponentProps) => {
  const isMine = message.senderId === myUserId;
  const time = formatTime(message.createdAt);

  if (message.type === "date") {
    return <MessageDate date={message.systemMessage || message.createdAt} />;
  }

  if (message.type === "system") {
    return (
      <MessageSystem
        system={message.systemMessage || "오류 발생. 관리자에게 문의하세요."}
      />
    );
  }

  if (message.type === "image") {
    return isMine ? (
      <OutgoingImageMessage imageUrl={message.imageUrl!} time={time} />
    ) : (
      <IncomingImageMessage
        nickname={message.nickname || "(알수없음)"}
        imageUrl={message.imageUrl!}
        time={time}
      />
    );
  }

  return isMine ? (
    <OutgoingMessage message={message.text!} time={time} />
  ) : (
    <IncomingMessage
      nickname={message.nickname || "(알수없음)"}
      message={message.text!}
      time={time}
    />
  );
};

export default ChatMessageComponent;
