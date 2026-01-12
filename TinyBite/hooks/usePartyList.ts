import { getPartyList } from "@/api/partyApi";
import { usePartyStore } from "@/stores/partyStore";
import { PartyListResponse } from "@/types/party.types";
import { useQuery } from "@tanstack/react-query";

/**
 * 파티 리스트 조회 Hook
 * @param location 사용자 위치 정보 (latitude, longitude)
 * @returns React Query 결과 (data, isLoading, error 등)
 */
export const usePartyList = (location: {
  latitude: string;
  longitude: string;
}) => {
  const partyType = usePartyStore((state) => state.partyType);

  const { data, isLoading, error } = useQuery<PartyListResponse>({
    queryKey: ["getParties", partyType, location.latitude, location.longitude],
    queryFn: () => getPartyList({ category: partyType, ...location }),
    enabled: !!location.latitude && !!location.longitude, // latitude와 longitude가 있을 때만 실행
  });

  return { data, isLoading, error };
};
