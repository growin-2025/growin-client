import { getOnetoOneRoomDetail, getOnetoOneRoomList } from "@/api/chatApi";
import { useQuery } from "@tanstack/react-query";

export const useGetOnetoOneRoomListQuery = () => {
  return useQuery({
    queryKey: ["getOnetoOneRoomList"],
    queryFn: getOnetoOneRoomList,
    staleTime: 0,
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
