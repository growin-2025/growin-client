import { getPartyList } from "@/api/partyApi";
import { PartyListParams, PartyListResponse } from "@/types/party";
import { useQuery } from "@tanstack/react-query";

/**
 * 파티 리스트 조회 Hook
 * @param params 파티 리스트 조회 파라미터
 * @returns React Query 결과 (data, isLoading, error 등)
 */
export const usePartyList = (params: PartyListParams) => {
  return useQuery<PartyListResponse>({
    queryKey: ["getParties", params.category],
    queryFn: () => getPartyList(params),
    enabled: !!params.latitude && !!params.longitude, // latitude와 longitude가 있을 때만 실행
  });
};
