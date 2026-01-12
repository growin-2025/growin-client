import { getPartyDetail } from "@/api/partyApi";
import { PartyDetail, PartyDetailParams } from "@/types/party.types";
import { useQuery } from "@tanstack/react-query";

/**
 * 파티 상세 조회 Hook
 * @param params 파티 상세 조회 파라미터 (partyId, latitude, longitude)
 * @returns React Query 결과 (data, isLoading, error 등)
 */
export const usePartyDetail = (params: PartyDetailParams) => {
  const { data, isLoading, error, isSuccess } = useQuery<PartyDetail>({
    queryKey: [
      "getPartyDetail",
      params.partyId,
      params.latitude,
      params.longitude,
    ],
    queryFn: () => getPartyDetail(params),
    enabled: !!params.partyId && !!params.latitude && !!params.longitude, // partyId, latitude, longitude가 모두 있을 때만 실행
  });

  return { data, isLoading, error, isSuccess };
};
