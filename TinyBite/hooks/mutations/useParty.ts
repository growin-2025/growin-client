import { postRequestJoinParty } from "@/api/partyApi";
import { ApiError } from "@/types/api.types";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export const useRequestJoinParty = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postRequestJoinParty,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getOnetoOneRoomList"] });
      router.push({
        pathname: "/(app)/chat/[id]",
        params: {
          id: data,
          roomType: "ONE_TO_ONE",
        },
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      if (error.status === 400) {
        Toast.show({
          type: "basicToast",
          props: { text: "이미 참여 요청을 보낸 파티입니다." },
          position: "bottom",
          bottomOffset: 133,
          visibilityTime: 2000,
        });
        return;
      }
      if (error.response?.data) {
        const message = getErrorMessage(error.response.data);
        alert(message);
        console.error(message);
      } else {
        console.error("네트워크 연결을 확인해주세요.");
      }
    },
  });
};
