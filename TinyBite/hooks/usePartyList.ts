import { getPartyList } from "@/api/partyApi";
import { PartyCategory, PartyListResponse } from "@/types/party";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

/**
 * 파티 리스트 조회 Hook
 * @param location 사용자 위치 정보 (latitude, longitude)
 * @returns React Query 결과 (data, isLoading, error 등) 및 카테고리 상태
 */
export const usePartyList = (location: {
  latitude: string;
  longitude: string;
}) => {
  const [partyType, setPartyType] = useState<PartyCategory>("ALL");

  const { data, isLoading, error } = useQuery<PartyListResponse>({
    queryKey: ["getParties", partyType, location.latitude, location.longitude],
    queryFn: () => getPartyList({ category: partyType, ...location }),
    enabled: !!location.latitude && !!location.longitude, // latitude와 longitude가 있을 때만 실행
  });

  return { data, isLoading, error, partyType, setPartyType };
};
