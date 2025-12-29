import { ChatItemType } from "@/types/Chat";

/**
 * 목업 채팅 데이터
 * TODO: 실제 API 연동 시 제거
 */
export const mockChatData: ChatItemType[] = [
  // 1:1 채팅 데이터
  {
    id: "1",
    name: "츄비",
    lastMessage: "안녕하세요! 참여 가능할까요?",
    chatType: "oneOnOne",
    status: "승인 대기",
    partyTitle: "후문에서 엽떡 나누실 분 구해요",
    timestamp: "방금전",
    myProfileImage: require("@/assets/images/mainlist/detail/default-host-profile.png"),
    opponentProfileImage: require("@/assets/images/mainlist/detail/default-host-profile.png"),
    unreadCount: 1,
  },
  {
    id: "2",
    name: "닉네임",
    lastMessage: "참여가능할까요?? 같이 나눠요!",
    chatType: "oneOnOne",
    status: "승인 거절",
    partyTitle: "1+1 행사 상품 나눠요",
    timestamp: "2025.11.11",
    myProfileImage: require("@/assets/images/mainlist/detail/default-host-profile.png"),
    opponentProfileImage: require("@/assets/images/mainlist/detail/default-host-profile.png"),
  },
  // 참여중인 파티 데이터
  {
    id: "3",
    name: "파티 제목 1",
    lastMessage: "안녕하세요! 파티에 참여하고 싶어요",
    chatType: "party",
    status: "모집 중",
    partyTitle: "후문에서 엽떡 나누실 분 구해요",
    timestamp: "1시간 전",
    memberCount: 3,
    unreadCount: 11,
    category: "delivery",
  },
  {
    id: "4",
    name: "파티 제목 2",
    lastMessage: "지금 바로 참여 가능합니다!",
    chatType: "party",
    status: "진행 중",
    partyTitle: "1+1 행사 상품 나눠요",
    timestamp: "2시간 전",
    partyImage: require("@/assets/images/mainlist/food1.jpg"),
    memberCount: 5,
    category: "grocery",
  },
];
