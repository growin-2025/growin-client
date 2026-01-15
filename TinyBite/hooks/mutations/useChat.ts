import {
  postApproveJoinParty,
  postCompleteParty,
  postRejectJoinParty,
  postSettleParty,
} from "@/api/partyApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const useApproveJoinPartyMutation = (
  partyId?: number,
  participantId?: number,
  chatroomId?: number
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!partyId || !participantId) {
        throw new Error("필수 파라미터 누락: approve join party");
      }

      return postApproveJoinParty(partyId, participantId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getOnetoOneRoomDetail", chatroomId],
      });
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
  partyId?: number,
  participantId?: number,
  chatroomId?: number
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!partyId || !participantId) {
        throw new Error("필수 파라미터 누락: approve join party");
      }

      return postRejectJoinParty(partyId, participantId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getOnetoOneRoomDetail", chatroomId],
      });
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

export const useCompletePartyMutation = (
  partyId?: number,
  chatroomId?: number
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!partyId) {
        throw new Error("필수 파라미터 누락: approve join party");
      }

      return postCompleteParty(partyId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getOnetoOneRoomDetail", chatroomId],
      });
    },
    onError: (error) => {
      Toast.show({
        type: "basicToast",
        props: { text: error.message },
        position: "bottom",
        bottomOffset: 133,
        visibilityTime: 2000,
      });
    },
  });
};

export const useSettlePartyMutation = (
  partyId?: number,
  chatroomId?: number
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!partyId) {
        throw new Error("필수 파라미터 누락: approve join party");
      }

      return postSettleParty(partyId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getOnetoOneRoomDetail", chatroomId],
      });
    },
    onError: (error) => {
      Toast.show({
        type: "basicToast",
        props: { text: error.message },
        position: "bottom",
        bottomOffset: 133,
        visibilityTime: 2000,
      });
    },
  });
};
