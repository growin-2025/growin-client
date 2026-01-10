/**
 * 채팅 타입
 */
export type ChatType = "oneOnOne" | "party";

/**
 * 1:1 채팅 상태 태그 타입
 */
export type OneOnOneChatStatusType =
  | "승인 대기"
  | "승인 거절"
  | "승인 완료"
  | "승인 요청"
  | "파티 종료";

/**
 * 참여중인 파티 상태 태그 타입
 */
export type PartyStatusType = "모집 중" | "진행 중" | "파티 종료";

/**
 * 파티 카테고리 타입
 */
export type PartyCategoryType = "delivery" | "grocery" | "essentials";

/**
 * 채팅 아이템 인터페이스 (공통 + 선택적 필드)
 */
export type ChatItemType = {
  // 1. 공통 필드 (어떤 채팅이든 무조건 있음)
  id: string;
  name?: string;
  lastMessage: string;
  chatType: ChatType;
  timestamp: string;
  unreadCount?: number;
  status: OneOnOneChatStatusType | PartyStatusType | null;
  partyTitle?: string;

  // 2. 1:1 채팅 전용
  opponentProfileImage?: any; //추후에 프로필 이미지 추가 시 url로 수정
  myProfileImage?: any; //추후에 프로필 이미지 추가 시 url로 수정

  // 3. 파티 채팅 전용
  partyImage?: any; //추후에 파티 이미지 추가 시 url로 수정
  memberCount?: number;
  category?: PartyCategoryType;
};

/**
 * 채팅방 메시지 타입
 */
export type ChatMessageType = "text" | "image" | "system" | "date";

/**
 * 채팅방 메시지 인터페이스
 */
export interface ChatMessage {
  id: string;
  type: ChatMessageType;
  createdAt: string;

  // text, image 전용
  senderId?: number;
  nickname?: string;
  text?: string;
  imageUrl?: string;

  // system 전용
  systemMessage?: string;
}
