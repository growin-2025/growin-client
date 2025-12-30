import { PartyListParams, PartyListResponse } from "@/types/party";

/**
 * 파티 리스트 조회 API
 * @param params 파티 리스트 조회 파라미터 (category, latitude, longitude)
 * @returns 파티 리스트 응답 데이터
 */
export const getPartyList = async (
  params: PartyListParams
): Promise<PartyListResponse> => {
  /** 
    const res = await privateAxios.get(ENDPOINT.PARTY.GET_PARTIES, {
    params: {
      category: params.category,
      latitude: params.latitude,
      longitude: params.longitude,
    },
  });
  return res.data.data;
  */

  // 데이터가 없을 때 임시로 가짜 데이터 반환
  return {
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
        category: "DELIVERY",
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
        category: "GROCERY",
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
        category: "HOUSEHOLD",
        createdAt: "2025-12-30T05:59:56.447Z",
      },
    ],
    hasNext: false,
    totalCount: 1,
  };
};
