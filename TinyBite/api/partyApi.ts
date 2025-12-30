import { privateAxios } from "@/api/axios";
import { ENDPOINT } from "@/api/urls";
import { PartyListParams, PartyListResponse } from "@/types/party";

/**
 * 파티 리스트 조회 API
 * @param params 파티 리스트 조회 파라미터 (category, latitude, longitude)
 * @returns 파티 리스트 응답 데이터
 */
export const getPartyList = async (
  params: PartyListParams
): Promise<PartyListResponse> => {
  const res = await privateAxios.get(ENDPOINT.PARTY.GET_PARTIES, {
    params: {
      category: params.category,
      latitude: params.latitude,
      longitude: params.longitude,
    },
  });
  return res.data.data;
};
