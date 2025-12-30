import { PartyListParams, PartyListResponse } from "@/types/party";

/**
 * 파티 리스트 조회 API
 * @param params 파티 리스트 조회 파라미터 (category, latitude, longitude)
 * @returns 파티 리스트 응답 데이터
 */
export const getPartyList = async (
  params: PartyListParams
): Promise<PartyListResponse> => {
  // 실제 API 호출 (백엔드 연동 시 주석 해제)
  // 백엔드에 category, latitude, longitude 파라미터를 전달하여 필터링된 파티 리스트를 받아옴
  /** 
    const res = await privateAxios.get(ENDPOINT.PARTY.GET_PARTIES, {
    params: {
      category: params.category, // 카테고리 필터 (ALL, DELIVERY, GROCERY, HOUSEHOLD)
      latitude: params.latitude,   // 사용자 위도
      longitude: params.longitude, // 사용자 경도
    },
  });
  return res.data; // 백엔드 응답 데이터 반환
  */

  // 임시 목 데이터 (백엔드 데이터 없을 때 UI 테스트용)
  // 실제 API 연동 시 이 부분은 제거하거나 주석 처리
  const mockData = {
    activeParties: [
      {
        partyId: 1,
        thumbnailImage:
          "https://cdn.imweb.me/thumbnail/20230228/25687782da912.png",
        title: "뿌링클 같이 나눠드실 분!",
        pricePerPerson: 5000,
        participantStatus: "1/4명",
        distance: "500m 이내",
        distanceKm: 0.5,
        timeAgo: "방금 전",
        isClosed: false,
        category: "DELIVERY" as const,
        createdAt: "2025-12-30T05:59:56.447Z",
      },
      {
        partyId: 3,
        thumbnailImage: "https://picsum.photos/200",
        title: "휴지 30개 나눔해염",
        pricePerPerson: 5000,
        participantStatus: "1/4명",
        distance: "500m 이내",
        distanceKm: 0.5,
        timeAgo: "방금 전",
        isClosed: false,
        category: "GROCERY" as const,
        createdAt: "2025-12-30T05:59:56.447Z",
      },
    ],
    closedParties: [
      {
        partyId: 2,
        thumbnailImage: "https://picsum.photos/200",
        title: "마감이여 뿌링클 같이 나눠드실 분! 뿌링클 같이 나눠드실 분!",
        pricePerPerson: 5000,
        participantStatus: "3/4명",
        distance: "500m 이내",
        distanceKm: 0.5,
        timeAgo: "방금 전",
        isClosed: true,
        category: "HOUSEHOLD" as const,
        createdAt: "2025-12-30T05:59:56.447Z",
      },
    ],
  };

  // 카테고리 필터링 (목 데이터용 - 실제 API 사용 시 불필요)
  // params.category가 "ALL"이거나 없으면 모든 카테고리 반환
  // 특정 카테고리 선택 시 해당 카테고리만 필터링
  const category = params.category;
  const filteredActiveParties =
    category && category !== "ALL"
      ? mockData.activeParties.filter((party) => party.category === category)
      : mockData.activeParties;
  const filteredClosedParties =
    category && category !== "ALL"
      ? mockData.closedParties.filter((party) => party.category === category)
      : mockData.closedParties;

  // 필터링된 파티 리스트 반환
  return {
    activeParties: filteredActiveParties, // 활성 파티 리스트
    closedParties: filteredClosedParties, // 종료된 파티 리스트
    hasNext: false, // 다음 페이지 존재 여부 (목 데이터는 false)
    totalCount: filteredActiveParties.length + filteredClosedParties.length, // 전체 개수
  };
};
