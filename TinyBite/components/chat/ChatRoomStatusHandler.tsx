import {
  useApproveJoinPartyMutation,
  useRejectJoinPartyMutation,
} from "@/hooks/mutations/useChat";
import { OneToOneChatDetailSchema, RoomType } from "@/types/chat.types";
import { ChatJoinRequestCard } from "./host/ChatJoinRequestCard";
import { ChatJoinAcceptedCard } from "./participant/ChatJoinAcceptedCard";
import { ChatJoinPendingCard } from "./participant/ChatJoinPendingCard";

// type participantType = 'HOST' | 'PARTICIPANT';
// type OneToOneChatStatusType = 'PENDING' | 'REJECTED' | 'APPROVED' | 'REQUESTED' | 'ENDED';

interface ChatRoomStatusHandlerProps {
  roomType: RoomType;
  chatDetail: OneToOneChatDetailSchema;
}

const ChatRoomStatusHandler = ({
  roomType,
  chatDetail,
}: ChatRoomStatusHandlerProps) => {
  const { mutate: approveMutate } = useApproveJoinPartyMutation(
    chatDetail.partyId,
    chatDetail.participantId,
    chatDetail.chatRoomId
  );
  const { mutate: rejectMutate } = useRejectJoinPartyMutation(
    chatDetail.partyId,
    chatDetail.participantId,
    chatDetail.chatRoomId
  );

  const { participantType, participantStatus } = chatDetail;

  // ONE_TO_ONE이 아니면 아무것도 렌더링하지 않음
  if (roomType !== "ONE_TO_ONE") {
    return null;
  }

  // HOST 분기
  if (participantType === "HOST") {
    if (participantStatus === "REQUESTED") {
      // 1:1 파티장 - 수락, 거절
      return (
        <ChatJoinRequestCard
          avatarUrl={chatDetail.targetProfileImage || ""}
          nickname={chatDetail.targetName}
          location={chatDetail.targetLocation || ""}
          message="파티에 참여하고 싶어요!"
          onApprove={approveMutate}
          onReject={rejectMutate}
        />
      );
    }

    if (participantStatus === "REJECTED" || participantStatus === "APPROVED") {
      return null;
    }

    // 예상치 못한 status
    alert(`HOST에게 예상치 못한 status: ${participantStatus}`);
    return null;
  }

  // PARTICIPANT 분기
  if (participantType === "PARTICIPANT") {
    if (participantStatus === "PENDING") {
      // 1:1 참여자 - 대기
      return <ChatJoinPendingCard />;
    }

    if (participantStatus === "APPROVED") {
      // 1:1 참여자 - 수락됨
      if (chatDetail.groupChatRoomId === undefined) {
        return null;
      }
      return <ChatJoinAcceptedCard chatRoomId={chatDetail.groupChatRoomId} />;
    }

    if (participantStatus === "REJECTED") {
      return null;
    }

    // 예상치 못한 status
    alert(`PARTICIPANT에게 예상치 못한 status: ${participantStatus}`);
    return null;
  }

  // 예상치 못한 participantType
  alert(`예상치 못한 participantType: ${participantType}`);
  return null;
};

export default ChatRoomStatusHandler;
