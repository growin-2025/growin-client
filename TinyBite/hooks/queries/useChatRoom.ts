import { getOnetoOneRoomList } from "@/api/chatApi";
import { useQuery } from "@tanstack/react-query";

export const useGetOnetoOneRoomListQuery = () => {
  return useQuery({
    queryKey: ["getOnetoOneRoomList"],
    queryFn: getOnetoOneRoomList,
    staleTime: 0,
  });
};
