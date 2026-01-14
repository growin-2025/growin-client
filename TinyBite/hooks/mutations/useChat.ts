import { postApproveJoinParty, postRejectJoinParty } from "@/api/partyApi";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const useApproveJoinPartyMutation = (
  partyId: number,
  participantId: number
) => {
  return useMutation({
    mutationFn: () => postApproveJoinParty(partyId, participantId),
    onSuccess: (data) => {
      return data;
    },
    onError: () => {
      Toast.show({
        type: "basicToast",
        props: { text: "파티 참여 승인에 실패했습니다. 다시 시도해주세요." },
        position: "bottom",
        bottomOffset: 133,
        visibilityTime: 2000,
      });
    },
  });
};

export const useRejectJoinPartyMutation = (
  partyId: number,
  participantId: number
) => {
  return useMutation({
    mutationFn: () => postRejectJoinParty(partyId, participantId),
    onSuccess: (data) => {
      return data;
    },
    onError: () => {
      Toast.show({
        type: "basicToast",
        props: { text: "파티 참여 거절에 실패했습니다. 다시 시도해주세요." },
        position: "bottom",
        bottomOffset: 133,
        visibilityTime: 2000,
      });
    },
  });
};
