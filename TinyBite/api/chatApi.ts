import { ApiSuccess } from "@/types/api.types";
import {
  GetChatMessagesParams,
  GetChatMessagesResponse,
  GroupChatCardSchema,
  GroupChatDetailSchema,
  OneToOneChatCardSchema,
  OneToOneChatDetailSchema,
} from "@/types/chat.types";
import { privateAxios } from "./axios";
import { ENDPOINT } from "./urls";

/**
 * 채팅방의 메시지 목록 조회
 */
export const getPrevMessage = async ({
  chatRoomId,
  page = 0,
  size = 20,
}: GetChatMessagesParams) => {
  const res = await privateAxios.get<ApiSuccess<GetChatMessagesResponse>>(
    ENDPOINT.CHAT.PREV_MESSAGE(chatRoomId),
    {
      params: {
        page,
        size,
      },
    }
  );
  return res.data.data;
};

/**
 * 1:1 채팅방 목록 조회
 */
export const getOnetoOneRoomList = async () => {
  const res = await privateAxios.get<ApiSuccess<OneToOneChatCardSchema[]>>(
    ENDPOINT.CHAT_ROOM.ONE_TO_ONE
  );
  return res.data.data;
};

/**
 * 1:1 채팅방 디테일 조회
 */
export const getOnetoOneRoomDetail = async (chatroomId: number) => {
  const res = await privateAxios.get<ApiSuccess<OneToOneChatDetailSchema>>(
    ENDPOINT.CHAT_ROOM.DETAIL.ONE_TO_ONE(chatroomId)
  );
  return res.data.data;
};

/**
 * 그룹 채팅방 목록 조회
 */
export const getGroupRoomList = async () => {
  const res = await privateAxios.get<ApiSuccess<GroupChatCardSchema[]>>(
    ENDPOINT.CHAT_ROOM.GROUP
  );
  return res.data.data;
};

/**
 * 그룹 채팅방 디테일 조회
 */
export const getGroupRoomDetail = async (chatroomId: number) => {
  const res = await privateAxios.get<ApiSuccess<GroupChatDetailSchema>>(
    ENDPOINT.CHAT_ROOM.DETAIL.GROUP(chatroomId)
  );
  return res.data.data;
};
