/**
 * 채팅방 타입
 */
export type RoomType = "ONE_TO_ONE" | "GROUP";

/**
 * 채팅방 참여자 타입
 */
export type participantType = "HOST" | "PARTICIPANT";

// ============================================

/**
 * 1:1 채팅 상태 (백엔드 기준)
 */
export type OneToOneChatStatusType =
  | "PENDING"
  | "REJECTED"
  | "APPROVED"
  | "REQUESTED"
  | "ENDED";

/**
 * 1:1 채팅 상태 : 한글 매핑 객체 (UI 전용)
 */
export const OneToOneChatStatusLabelMap: Record<
  OneToOneChatStatusType,
  string
> = {
  PENDING: "승인 대기",
  REJECTED: "승인 거절",
  APPROVED: "승인 완료",
  REQUESTED: "승인 요청",
  ENDED: "파티 종료",
};

/**
 * 1:1 채팅 카드 스키마
 */
export interface OneToOneChatCardSchema {
  chatRoomId: number;
  roomType: RoomType;
  myId: number;
  myProfileImage: string;
  targetId: number;
  targetName: string;
  targetProfileImage: string;
  recentTime: string; // "2026-01-10T23:40:00"
  partyTitle: string;
  status: OneToOneChatStatusType;
  recentMessage: string;
  unreadMessageCnt: number;
}

/**
 * 1:1 채팅방 내부 detail 스키마
 */
export interface OneToOneChatDetailSchema {
  chatRoomId: number;
  participantId: number;
  participantType: participantType;
  participantStatus: OneToOneChatStatusType;
  partyId: number;
  partyTitle: string;
  targetName: string;

  // HOST에게 포함되는 정보
  targetProfileImage?: string;
  targetLocation?: string;

  // PARTICIPANT에게 포함되는 정보
  // participantStatus가 APPROVED일 때만 한함
  groupChatRoomId?: number;
}

// ============================================

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
  roomType: RoomType;
  timestamp: string;
  unreadCount?: number;
  status: OneToOneChatStatusType | PartyStatusType | null;
  partyTitle?: string;

  // 2. 1:1 채팅 전용
  opponentProfileImage?: any; //추후에 프로필 이미지 추가 시 url로 수정
  myProfileImage?: any; //추후에 프로필 이미지 추가 시 url로 수정

  // 3. 파티 채팅 전용
  partyImage?: any; //추후에 파티 이미지 추가 시 url로 수정
  memberCount?: number;
  category?: PartyCategoryType;
};

// ============================================

/**
 * 채팅방 메시지 타입
 */
export type MessageType = "DATE" | "SYSTEM" | "TEXT" | "IMAGE";

/**
 * 채팅방 메시지 공통 베이스
 */
export interface BaseMessage {
  messageId: number;
  messageType: MessageType;
  createdAt: string; // 2025-11-22T00:00:00.000Z
}

/**
 * DATE
 */
export interface DateMessage extends BaseMessage {
  messageId: number;
  messageType: "DATE";
  createdAt: string;

  date: string; // 2026.01.03
}

/**
 * SYSTEM
 */
export interface SystemMessage extends BaseMessage {
  messageId: number;
  messageType: "SYSTEM";
  createdAt: string;

  systemMessage: string;
}

/**
 * TEXT
 */
export interface TextMessage extends BaseMessage {
  messageId: number;
  messageType: "TEXT";
  createdAt: string;

  senderId: number;
  nickname: string;
  isMine: boolean;

  text: string;
}

/**
 * IMAGE
 */
export interface ImageUrlMessage extends BaseMessage {
  messageId: number;
  messageType: "IMAGE";
  createdAt: string;

  senderId: number;
  nickname: string;
  isMine: boolean;

  imageUrl: string;
}

/**
 * 최종 유니온 타입
 */
export type ChatMessageSchema =
  | TextMessage
  | ImageUrlMessage
  | SystemMessage
  | DateMessage;

/**
 * 채팅방 이전 메시지 조회 request
 */
export interface GetChatMessagesParams {
  chatRoomId: number;
  page?: number;
  size?: number;
}

/**
 * 채팅방 이전 메시지 조회 response
 */

export interface GetChatMessagesResponse {
  messages: ChatMessageSchema[];
  hasNext: boolean;
}
