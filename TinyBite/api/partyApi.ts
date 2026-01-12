import { Photo } from "@/stores/creatingPartyStore";
import { ApiSuccess } from "@/types/api.types";
import {
  CreatingPartyBody,
  EditedPartyInfo,
  PartyDetail,
  PartyDetailParams,
  PartyItem,
  PartyListParams,
  PartyListResponse,
} from "@/types/party.types";
import { parseProfileImage } from "@/utils/parseProfileImage";
import { Platform } from "react-native";
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
 * 파티 생성 API
 * @param newParty 파티를 생성하는데 필요한 값
 */
export const postCreateParty = async (newParty: CreatingPartyBody) => {
  await privateAxios.post(ENDPOINT.PARTY.CREATE_PARTIES, newParty);
};

/**
 * 이미지 업로드 API
 * @param photoList 기기에서 선택된 이미지 경로 리스트
 * @returns 업로드 된 이미지 url 리스트
 */
export const postFile = async (photoList: Photo[]) => {
  const uploadPromises = photoList.map(async (image) => {
    const formData = new FormData();
    formData.append("file", {
      name: image.fileName,
      type: image.mimeType,
      uri:
        Platform.OS === "ios"
          ? image.imageUri.replace("file://", "")
          : image.imageUri,
    } as any);

    const res = await privateAxios.post(ENDPOINT.FILE.UPLOAD_FILE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data.data;
  });

  const results = await Promise.all(uploadPromises);
  return results;
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

    const data = res.data;

    // 반환 시 가공된 값을 포함
    return {
      ...data,
      host: data.host
        ? {
            ...data.host,
            profileImage: parseProfileImage(data.host.profileImage) ?? "",
          }
        : data.host,
    };
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
  } catch (error: any) {
    // 400(이미 참여자가 있음 / 권한 없음) 상태 코드인 경우 에러 로그 출력하지 않음
    if (error?.response?.status !== 400) {
      console.error("파티 삭제 실패:", error);
    }
    throw error;
  }
};

/**
 * 파티 수정 API
 * @param partyId 수정할 파티 id
 * @param body 수정할 파티 정보
 */
export const patchParty = async ({
  partyId,
  body,
}: {
  partyId: number;
  body: EditedPartyInfo;
}) => {
  await privateAxios.patch(ENDPOINT.PARTY.EDIT_PARTIES(partyId), body);
};

/* 참여중인 파티 리스트 조회 API
 * @returns 참여중인 파티 리스트
 */
export const getActiveParties = async (): Promise<PartyItem[]> => {
  try {
    const res = await privateAxios.get(ENDPOINT.USER.ACTIVE_PARTIES);
    return res.data || [];
  } catch (error) {
    console.error("참여중인 파티 리스트 로딩 실패:", error);
    return [];
  }
};

/**
 * 호스팅 중인 파티 리스트 조회 API
 * @returns 호스팅 중인 파티 리스트
 */
export const getHostingParties = async (): Promise<PartyItem[]> => {
  try {
    const res = await privateAxios.get(ENDPOINT.USER.HOSTING_PARTIES);
    return res.data || [];
  } catch (error) {
    console.error("호스팅 중인 파티 리스트 로딩 실패:", error);
    return [];
  }
};

/**
 * 파티 참여 신청
 * @returns 1대1 대화방 ID
 */
export const postRequestJoinParty = async (partyId: number) => {
  const res = await privateAxios.post<ApiSuccess<number>>(
    ENDPOINT.PARTY.REQUEST_JOIN_PARTY(partyId)
  );

  return res.data.data;
};
