import {
  useApproveJoinPartyMutation,
  useRejectJoinPartyMutation,
} from "@/hooks/mutations/useChat";
import {
  GroupChatDetailSchema,
  OneToOneChatDetailSchema,
} from "@/types/chat.types";
import { ChatJoinRequestCard } from "./host/ChatJoinRequestCard";
import ChatPartyClosureCard from "./host/ChatPartyClosureCard";
import { ChatRecruitmentCloseCard } from "./host/ChatRecruitmentCloseCard";
import { ChatJoinAcceptedCard } from "./participant/ChatJoinAcceptedCard";
import { ChatJoinPendingCard } from "./participant/ChatJoinPendingCard";
import ChatPartyProgressCard from "./participant/ChatPartyProgressCard";

// type participantType = 'HOST' | 'PARTICIPANT';
// type OneToOneChatStatusType = 'PENDING' | 'REJECTED' | 'APPROVED' | 'REQUESTED' | 'ENDED';
// type GroupChatStatusType = "RECRUITING" | "COMPLETED" | "CLOSED" | "CANCELLED";

interface ChatRoomStatusHandlerProps {
  chatDetail: OneToOneChatDetailSchema | GroupChatDetailSchema;
}

const ChatRoomStatusHandler = ({ chatDetail }: ChatRoomStatusHandlerProps) => {
  const approveMutation = useApproveJoinPartyMutation(
    chatDetail.roomType === "ONE_TO_ONE" ? chatDetail.partyId : undefined,
    chatDetail.roomType === "ONE_TO_ONE" ? chatDetail.participantId : undefined,
    chatDetail.roomType === "ONE_TO_ONE" ? chatDetail.chatRoomId : undefined
  );

  const rejectMutation = useRejectJoinPartyMutation(
    chatDetail.roomType === "ONE_TO_ONE" ? chatDetail.partyId : undefined,
    chatDetail.roomType === "ONE_TO_ONE" ? chatDetail.participantId : undefined,
    chatDetail.roomType === "ONE_TO_ONE" ? chatDetail.chatRoomId : undefined
  );

  // GROUP인 경우
  if (chatDetail.roomType === "GROUP") {
    // HOST 분기
    if (chatDetail.participantType === "HOST") {
      if (chatDetail.status === "RECRUITING") {
        return (
          <ChatRecruitmentCloseCard
            currentMembers={chatDetail.currentParticipantCnt}
            maxMembers={chatDetail.maxParticipantCnt}
            partyId={chatDetail.partyId}
            groupChatRoomId={chatDetail.groupChatRoomId}
          />
        );
      }

      if (chatDetail.status === "COMPLETED") {
        return (
          <ChatPartyClosureCard
            groupChatRoomId={chatDetail.groupChatRoomId}
            partyId={chatDetail.partyId}
          />
        );
      }

      if (chatDetail.status === "CLOSED" || chatDetail.status === "CANCELLED") {
        return null;
      }

      // 예상치 못한 status
      alert(`HOST에게 예상치 못한 status: ${chatDetail.status}`);
      return null;
    }

    // PARTICIPANT 분기
    if (chatDetail.participantType === "PARTICIPANT") {
      return (
        <ChatPartyProgressCard
          status={chatDetail.status}
          currentMembers={chatDetail.currentParticipantCnt}
          maxMembers={chatDetail.maxParticipantCnt}
        />
      );
    }

    // 예상치 못한 participantType
    alert(`예상치 못한 participantType: ${chatDetail.participantType}`);
    return null;
  }

  // ONE_TO_ONE인 경우
  const { participantType, participantStatus } = chatDetail;

  const handleApprove = () => {
    if (chatDetail.roomType !== "ONE_TO_ONE") return;
    approveMutation.mutate();
  };

  const handleReject = () => {
    if (chatDetail.roomType !== "ONE_TO_ONE") return;
    rejectMutation.mutate();
  };

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
          onApprove={handleApprove}
          onReject={handleReject}
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
