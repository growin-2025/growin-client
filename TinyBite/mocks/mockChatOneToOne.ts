import { ChatMessage } from "@/types/chat";

export const mockChatOneToOne: ChatMessage[] = [
  {
    id: "6",
    type: "image",
    senderId: 2,
    nickname: "츄비",
    imageUrl: "https://picsum.photos/401/301",
    createdAt: "2025-11-22T18:05:50.000Z",
  },
  {
    id: "5",
    type: "image",
    senderId: 2,
    nickname: "츄비",
    imageUrl: "https://picsum.photos/400/300",
    createdAt: "2025-11-22T18:05:40.000Z",
  },
  {
    id: "4",
    type: "text",
    senderId: 2,
    nickname: "츄비",
    text: "파티 초대해드릴게요 잠시만요!",
    createdAt: "2025-11-22T18:05:30.000Z",
  },
  {
    id: "3",
    type: "text",
    senderId: 1,
    nickname: "나",
    text: "계좌번호 주시면 입금할게요.",
    createdAt: "2025-11-22T18:05:20.000Z",
  },
  {
    id: "2",
    type: "text",
    senderId: 1,
    nickname: "나",
    text: "안녕하세요 참여 가능할까요?",
    createdAt: "2025-11-22T18:05:10.000Z",
  },
  {
    id: "1",
    type: "text",
    senderId: 2,
    nickname: "츄비",
    text: "안녕하세요! 주문 30분 남았습니다.",
    createdAt: "2025-11-22T18:05:00.000Z",
  },
  {
    id: "0",
    type: "date",
    systemMessage: "2025.11.22",
    createdAt: "2025-11-22T00:00:00.000Z",
  },
];
