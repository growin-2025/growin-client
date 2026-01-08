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

/**
 * 파티 생성 body 타입
 */
export type CreatingPartyBody = {
  title: string;
  category: PartyCategory;
  totalPrice: number;
  maxParticipants: number;
  pickupLocation: {
    place: string;
    pickupLatitude: number;
    pickupLongitude: number;
  };
  images?: string[];
  productLink?: string;
  description?: string;
};

/**
 * 호스트 정보 타입
 */
export type HostInfo = {
  userId: number;
  nickname: string;
  profileImage: string;
};

/**
 * 픽업 위치 정보 타입
 */
export type PickupLocation = {
  place: string;
  pickupLatitude: number;
  pickupLongitude: number;
};

/**
 * 상품 링크 정보 타입
 */
export type ProductLink = {
  thumbnailImage: string;
  productName: string;
  url: string;
};

/**
 * 파티 상세 조회 요청 파라미터 타입
 */
export type PartyDetailParams = {
  partyId: number;
  latitude: string;
  longitude: string;
};

/**
 * 파티 상세 정보 타입
 */
export type PartyDetail = {
  partyId: number;
  title: string;
  category: PartyCategory;
  timeAgo: string;
  host: HostInfo;
  pickupLocation: PickupLocation;
  distance: string;
  currentParticipants: number;
  maxParticipants: number;
  remainingSlots: number;
  pricePerPerson: number;
  totalPrice: number;
  productLink: ProductLink | null;
  description: string | null;
  images: string[];
  isClosed: boolean;
  isParticipating: boolean;
};

/**
 * 파티 수정 정보 타입
 */
export type EditedPartyInfo = {
  title?: string;
  totalPrice?: number;
  maxParticipants?: number;
  pickupLocation?: {
    place: string;
    pickupLatitude?: number;
    pickupLongitude?: number;
  };
  productLink?: string;
  description?: string;
  images?: string[];
};

/**
 * 검색 API 요청 파라미터 타입
 */
export type SearchPartyParams = {
  q: string;
  category?: PartyCategory;
  page?: number;
  size?: number;
};

/**
 * 검색 API 응답 데이터 타입
 */
export type SearchPartyResponseData = {
  parties: PartyItem[];
  hasNext: boolean;
};

/**
 * 검색 API 응답 타입
 */
export type SearchPartyResponse = {
  data: SearchPartyResponseData;
};
