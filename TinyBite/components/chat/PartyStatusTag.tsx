import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import {
  GroupChatStatusLabelMap,
  GroupChatStatusType,
} from "@/types/chat.types";
import { StyleSheet, Text, View } from "react-native";

export interface PartyStatusTagProps {
  status: GroupChatStatusType;
}

/**
 * 참여중인 파티 상태 태그 컴포넌트
 * - 모집 중: 초록 배경, 초록 텍스트
 * - 진행 중: 초록 배경, 초록 텍스트
 * - 파티 종료: 회색 배경, 회색 텍스트
 */
const PartyStatusTag = ({ status }: PartyStatusTagProps) => {
  // 상태별 스타일을 객체로 정의
  const statusStyles = {
    RECRUITING: {
      // 모집 중
      container: styles.statusTagRecruiting,
      text: styles.statusTagTextRecruiting,
    },
    COMPLETED: {
      // 진행 중
      container: styles.statusTagOngoing,
      text: styles.statusTagTextOngoing,
    },
    CLOSED: {
      // 파티 종료
      container: styles.statusTagEnded,
      text: styles.statusTagTextEnded,
    },
    CANCELLED: {
      // ??
      container: styles.statusTagEnded,
      text: styles.statusTagTextEnded,
    },
  };

  const currentStyle = statusStyles[status] || statusStyles["RECRUITING"];

  return (
    <View style={[styles.statusTag, currentStyle.container]}>
      <Text
        style={[
          styles.statusTagText,
          textStyles.body12_M135,
          currentStyle.text,
        ]}
      >
        {GroupChatStatusLabelMap[status]}
      </Text>
    </View>
  );
};

export default PartyStatusTag;

const styles = StyleSheet.create({
  // 상태 태그 기본 스타일
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 100,
  },
  // 모집 중 상태 태그
  statusTagRecruiting: {
    backgroundColor: colors.sub,
  },
  // 진행 중 상태 태그
  statusTagOngoing: {
    backgroundColor: colors.green[2],
  },
  // 파티 종료 상태 태그
  statusTagEnded: {
    backgroundColor: colors.gray[4],
  },
  // 상태 태그 텍스트 기본 스타일
  statusTagText: {},
  // 모집 중 상태 태그 텍스트
  statusTagTextRecruiting: {
    color: colors.main,
  },
  // 진행 중 상태 태그 텍스트
  statusTagTextOngoing: {
    color: colors.green[1],
  },
  // 파티 종료 상태 태그 텍스트
  statusTagTextEnded: {
    color: colors.gray[1],
  },
});
