import { PartyItem, PartyListParams, PartyListResponse } from "@/types/party";
import { privateAxios } from "./axios";
import { ENDPOINT } from "./urls";

/**
 * 파티 아이템의 필수 필드 검증
 * 화면 표시에 필요한 필드들을 검증합니다.
 */
const isValidPartyItem = (item: any): item is PartyItem => {
  if (!item || typeof item !== "object") {
    return false;
  }
  if (
    typeof item.partyId !== "number" ||
    // 이미지는 잘못된 값이면 UI에서 기본이미지로 처리
    typeof item.title !== "string" ||
    typeof item.pricePerPerson !== "number" ||
    typeof item.participantStatus !== "string" ||
    typeof item.distance !== "string" ||
    typeof item.distanceKm !== "number" ||
    typeof item.timeAgo !== "string" ||
    typeof item.isClosed !== "boolean"
  ) {
    return false;
  }
  const validCategories = ["ALL", "DELIVERY", "GROCERY", "HOUSEHOLD"];
  if (!validCategories.includes(item.category)) {
    return false;
  }
  return true;
};

/**
 * 필수 필드만 검증하는 유효성 검사 함수
 */
const isValidPartyListResponse = (data: any): data is PartyListResponse => {
  if (!data || typeof data !== "object") {
    return false;
  }

  // activeParties와 closedParties가 배열인지 확인
  if (
    !Array.isArray(data.activeParties) ||
    !Array.isArray(data.closedParties)
  ) {
    return false;
  }

  // 각 배열의 아이템들이 유효한지 확인
  const allActivePartiesValid = data.activeParties.every(isValidPartyItem);
  const allClosedPartiesValid = data.closedParties.every(isValidPartyItem);

  return allActivePartiesValid && allClosedPartiesValid;
};

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

    // 쿼리 내용 업데이트 시마다 유효성 검사 수행
    if (!isValidPartyListResponse(responseData)) {
      console.error("유효하지 않은 응답 데이터:", responseData);
      return {
        activeParties: [],
        closedParties: [],
        hasNext: false,
        totalCount: 0,
      };
    }

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
