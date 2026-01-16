import {
  getGroupRoomDetail,
  getGroupRoomList,
  getOnetoOneRoomDetail,
  getOnetoOneRoomList,
} from "@/api/chatApi";
import { useQuery } from "@tanstack/react-query";

export const useGetOnetoOneRoomListQuery = () => {
  return useQuery({
    queryKey: ["getOnetoOneRoomList"],
    queryFn: getOnetoOneRoomList,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};

export const useGetOnetoOneRoomDetailQuery = (
  chatroomId: number,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["getOnetoOneRoomDetail", chatroomId],
    queryFn: () => getOnetoOneRoomDetail(chatroomId),
    ...options,
  });
};

export const useGetGroupRoomListQuery = () => {
  return useQuery({
    queryKey: ["useGetGroupRoomListQuery"],
    queryFn: getGroupRoomList,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};

export const useGetGroupRoomDetailQuery = (
  chatroomId: number,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["useGetGroupRoomDetailQuery", chatroomId],
    queryFn: () => getGroupRoomDetail(chatroomId),
    ...options,
  });
};
