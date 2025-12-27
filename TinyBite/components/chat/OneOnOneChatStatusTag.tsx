import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import { OneOnOneChatStatusType } from "@/types/Chat";
import { StyleSheet, Text, View } from "react-native";

export interface OneOnOneChatStatusTagProps {
  status: OneOnOneChatStatusType;
}

/**
 * 1:1 채팅 상태 태그 컴포넌트
 * - 승인 대기: 오렌지 배경, 오렌지 텍스트
 * - 승인 거절: 빨간 배경, 빨간 텍스트
 * - 승인 완료: 초록 배경, 초록 텍스트
 * - 승인 요청: 오렌지 배경, 오렌지 텍스트
 * - 파티 종료: 회색 배경, 회색 텍스트
 */
const OneOnOneChatStatusTag = ({ status }: OneOnOneChatStatusTagProps) => {
  // 상태별 스타일을 객체로 정의
  const statusStyles = {
    "승인 대기": {
      container: styles.statusTagPending,
      text: styles.statusTagTextPending,
    },
    "승인 거절": {
      container: styles.statusTagRejected,
      text: styles.statusTagTextRejected,
    },
    "승인 완료": {
      container: styles.statusTagCompleted,
      text: styles.statusTagTextCompleted,
    },
    "승인 요청": {
      container: styles.statusTagRequest,
      text: styles.statusTagTextRequest,
    },
    "파티 종료": {
      container: styles.statusTagEnded,
      text: styles.statusTagTextEnded,
    },
  };

  const currentStyle = statusStyles[status] || statusStyles["승인 대기"];

  return (
    <View style={[styles.statusTag, currentStyle.container]}>
      <Text
        style={[
          styles.statusTagText,
          textStyles.body12_M135,
          currentStyle.text,
        ]}
      >
        {status}
      </Text>
    </View>
  );
};

export default OneOnOneChatStatusTag;

const styles = StyleSheet.create({
  // 상태 태그 기본 스타일
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 100,
  },
  // 승인 대기 상태 태그
  statusTagPending: {
    backgroundColor: colors.sub,
  },
  // 승인 거절 상태 태그
  statusTagRejected: {
    backgroundColor: colors.red[2],
  },
  // 승인 완료 상태 태그
  statusTagCompleted: {
    backgroundColor: colors.green[2],
  },
  // 승인 요청 상태 태그
  statusTagRequest: {
    backgroundColor: colors.sub,
  },
  // 파티 종료 상태 태그
  statusTagEnded: {
    backgroundColor: colors.gray[4],
  },
  // 상태 태그 텍스트 기본 스타일
  statusTagText: {},
  // 승인 대기 상태 태그 텍스트
  statusTagTextPending: {
    color: colors.main,
  },
  // 승인 거절 상태 태그 텍스트
  statusTagTextRejected: {
    color: colors.red[1],
  },
  // 승인 완료 상태 태그 텍스트
  statusTagTextCompleted: {
    color: colors.green[1],
  },
  // 승인 요청 상태 태그 텍스트
  statusTagTextRequest: {
    color: colors.main,
  },
  // 파티 종료 상태 태그 텍스트
  statusTagTextEnded: {
    color: colors.gray[1],
  },
});
