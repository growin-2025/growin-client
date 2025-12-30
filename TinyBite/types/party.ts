/**
 * 파티 카테고리 타입
 */
export type PartyCategory = "ALL" | "DELIVERY" | "GROCERY" | "HOUSEHOLD";

/**
 * 파티 리스트 조회 요청 파라미터 타입
 */
export type PartyListParams = {
  category?: PartyCategory;
  latitude: string;
  longitude: string;
};

/**
 * 파티 아이템 타입
 */
export type PartyItem = {
  partyId: number;
  thumbnailImage: string;
  title: string;
  pricePerPerson: number;
  participantStatus: string;
  distance: string;
  distanceKm: number;
  timeAgo: string;
  isClosed: boolean;
  category: PartyCategory;
  createdAt: string;
};

/**
 * 파티 리스트 API 응답 타입
 */
export type PartyListResponse = {
  activeParties: PartyItem[];
  closedParties: PartyItem[];
  hasNext: boolean;
  totalCount: number;
};
