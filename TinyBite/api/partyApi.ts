import {
  PartyDetail,
  PartyDetailParams,
  PartyListParams,
  PartyListResponse,
} from "@/types/party";
import { privateAxios } from "./axios";
import { ENDPOINT } from "./urls";

/**
 * 파티 리스트 조회 API
 * @param params 파티 리스트 조회 파라미터 (category, latitude, longitude)
 * @returns 파티 리스트 응답 데이터
 */
export const getPartyList = async (
  params: PartyListParams
): Promise<PartyListResponse> => {
  try {
    const res = await privateAxios.get(ENDPOINT.PARTY.GET_PARTIES, {
      params: {
        category: params.category,
        latitude: params.latitude,
        longitude: params.longitude,
      },
    });

    const responseData = res.data;

    // hasNext와 totalCount가 없으면 기본값 설정
    return {
      activeParties: responseData.activeParties || [],
      closedParties: responseData.closedParties || [],
      hasNext: responseData.hasNext ?? false,
      totalCount: responseData.totalCount ?? 0,
    };
  } catch (error) {
    console.error("파티 리스트 로딩 실패:", error);
    // 에러 발생 시 빈 데이터 구조를 던져주면 "파티가 없어요" 화면을 보여줍니다.
    return {
      activeParties: [],
      closedParties: [],
      hasNext: false,
      totalCount: 0,
    };
  }
};

/**
 * 파티 상세 조회 API
 * @param params 파티 상세 조회 파라미터 (partyId, latitude, longitude)
 * @returns 파티 상세 정보
 */
export const getPartyDetail = async (
  params: PartyDetailParams
): Promise<PartyDetail> => {
  try {
    const res = await privateAxios.get(ENDPOINT.PARTY.DETAIL(params.partyId), {
      params: {
        latitude: params.latitude,
        longitude: params.longitude,
      },
    });

    return res.data;
  } catch (error) {
    console.error("파티 상세 조회 실패:", error);
    throw error;
  }
};

/**
 * 파티 삭제 API
 * @param partyId 삭제할 파티 ID
 * @returns 삭제 성공 여부
 */
export const deleteParty = async (partyId: number): Promise<void> => {
  try {
    await privateAxios.delete(ENDPOINT.PARTY.DETAIL(partyId));
  } catch (error) {
    console.error("파티 삭제 실패:", error);
    throw error;
  }
};
