import ConfirmModal from "@/components/ConfirmModal";
import { colors } from "@/styles/colors";
import { textStyles } from "@/styles/typography/textStyles";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

interface PartyDetailMoreButtonProps {
  onEdit?: () => void; // 수정 버튼 클릭 시 호출
  onDelete?: () => Promise<boolean> | boolean | void; // 삭제 버튼 클릭 시 호출 (성공 시 true, 실패 시 false 반환)
}

/**
 * 파티 상세 화면의 더보기 버튼 컴포넌트
 * - 더보기 버튼과 바텀 시트 메뉴를 포함
 * - 수정/삭제 옵션 제공
 */
const PartyDetailMoreButton = ({
  onEdit,
  onDelete,
}: PartyDetailMoreButtonProps) => {
  const insets = useSafeAreaInsets();
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false); // 바텀 시트 표시 여부
  const [deleteModalVisible, setDeleteModalVisible] = useState(false); // 삭제 확인 모달 표시 여부
  const [deleteFailedModalVisible, setDeleteFailedModalVisible] =
    useState(false); // 삭제 실패 모달 표시 여부

  return (
    <>
      {/* 더보기 버튼 (오른쪽) - 헤더 위에 고정 */}
      <TouchableOpacity
        onPress={() => setBottomSheetVisible(true)}
        style={[styles.moreButtonContainer, { marginTop: insets.top + 2 }]}
      >
        <Image
          source={require("@/assets/images/mainlist/detail/more-36.png")}
          style={styles.moreIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* 바텀 시트 메뉴 */}
      {bottomSheetVisible && (
        <>
          {/* 배경 오버레이 */}
          <TouchableOpacity
            style={styles.bottomSheetOverlay}
            activeOpacity={1}
            onPress={() => setBottomSheetVisible(false)}
          />
          {/* 바텀 시트 */}
          <SafeAreaView style={styles.bottomSheet} edges={["bottom"]}>
            {/* 드래그 핸들 */}
            <View style={styles.bottomSheetHandle} />
            {/* 메뉴 옵션 */}
            <TouchableOpacity
              style={styles.bottomSheetOption}
              onPress={() => {
                onEdit?.();
                setBottomSheetVisible(false);
              }}
            >
              <Text
                style={[styles.bottomSheetOptionText, textStyles.title20_SB135]}
              >
                수정
              </Text>
              {/* 구분선 (80% 너비) */}
              <View style={styles.bottomSheetDivider} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomSheetOption}
              onPress={() => {
                setBottomSheetVisible(false);
                setDeleteModalVisible(true);
              }}
            >
              <Text
                style={[
                  styles.bottomSheetOptionText,
                  styles.bottomSheetOptionTextDanger,
                  textStyles.title20_SB135,
                ]}
              >
                삭제
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
        </>
      )}

      {/* 삭제 확인 모달 */}
      <ConfirmModal
        visible={deleteModalVisible}
        title="게시글을 삭제할까요?"
        message={`게시글을 삭제하면\n모든 데이터가 삭제되고 다시 볼 수 없어요`}
        cancelText="취소"
        confirmText="삭제"
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={async () => {
          const result = await onDelete?.();
          // onDelete가 false를 반환하면 삭제 실패 모달 표시
          if (result === false) {
            setDeleteModalVisible(false);
            setDeleteFailedModalVisible(true);
            return false; // 모달을 닫지 않음 (실패 모달이 열림)
          }
        }}
      />

      {/* 삭제 실패 모달 */}
      <ConfirmModal
        visible={deleteFailedModalVisible}
        title={`파티를 삭제할 수 없습니다.\n승인된 파티원이 있어 삭제가 불가능해요.`}
        singleButtonText="닫기"
        onClose={() => setDeleteFailedModalVisible(false)}
      />
    </>
  );
};

export default PartyDetailMoreButton;

const styles = StyleSheet.create({
  // 더보기 버튼 컨테이너 (오른쪽)
  moreButtonContainer: {
    position: "absolute",
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)", // 반투명 배경
    zIndex: 11, // 헤더 배경 위에 표시
  },
  moreIcon: {
    width: 36,
    height: 36,
  },
  // 바텀 시트 오버레이
  bottomSheetOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 100, // 최상위 레이어
  },
  // 바텀 시트
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 8,
    paddingBottom: 30,
    zIndex: 101, // 오버레이 위에 표시
    boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.25)",
  },
  // 드래그 핸들
  bottomSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#CCCCCC",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 24,
  },
  // 바텀 시트 옵션
  bottomSheetOption: {
    alignItems: "center",
  },
  // 구분선
  bottomSheetDivider: {
    width: "80%",
    height: 1,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: colors.gray[4],
  },
  bottomSheetOptionText: {
    color: colors.black,
  },
  bottomSheetOptionTextDanger: {
    color: colors.red[1],
  },
});
