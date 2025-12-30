import { PartyListParams, PartyListResponse } from "@/types/party";
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
  // 백엔드에 category, latitude, longitude 파라미터를 전달하여 필터링된 파티 리스트를 받아옴

  const res = await privateAxios.get(ENDPOINT.PARTY.GET_PARTIES, {
    params: {
      category: params.category,
      latitude: params.latitude,
      longitude: params.longitude,
    },
  });
  //console.log("API 성공 응답 데이터:", res.data);

  return res.data; // 백엔드 응답 데이터 반환
};
