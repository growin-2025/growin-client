import { colors } from "@/styles/colors";
import { OneToOneChatCardSchema, PartyCategoryType } from "@/types/chat.types";
import { Image, StyleSheet, View } from "react-native";

/**
 * 카테고리별 아이콘 매핑
 */
const categoryIcons: Record<PartyCategoryType, any> = {
  delivery: require("@/assets/images/main/category/delivery.png"),
  grocery: require("@/assets/images/main/category/grocery.png"),
  essentials: require("@/assets/images/main/category/essentials.png"),
};

interface ChatItemImageProps {
  item: OneToOneChatCardSchema;
}

/**
 * 채팅 아이템 이미지 컴포넌트
 * - 1:1 채팅: 겹쳐진 프로필 이미지
 * - 파티 채팅: 네모 형식 파티 이미지
 */
const ChatItemImage = ({ item }: ChatItemImageProps) => {
  const isOneOnOne = item.roomType === "ONE_TO_ONE";

  if (isOneOnOne) {
    return (
      <View style={styles.overlappingProfilesContainer}>
        {/* 상대방 프로필 이미지 (왼쪽) */}
        <View style={styles.opponentProfileWrapper}>
          {item.targetProfileImage ? (
            <Image
              source={{ uri: item.targetProfileImage }}
              style={styles.profileImageCircle}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.profileImagePlaceholder} />
          )}
        </View>
        {/* 내 프로필 이미지 (오른쪽, 겹침) */}
        <View style={styles.myProfileWrapper}>
          {item.myProfileImage ? (
            <Image
              source={{ uri: item.myProfileImage }}
              style={styles.profileImageCircle}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.profileImagePlaceholder} />
          )}
        </View>
      </View>
    );
  }

  // return (
  //   <View style={styles.partyImageWrapper}>
  //     {item.partyImage ? (
  //       <Image
  //         source={{ uri: item.partyImage }}
  //         style={styles.partyImage}
  //         resizeMode="cover"
  //       />
  //     ) : (
  //       <View style={styles.partyImagePlaceholder}>
  //         {item.category && categoryIcons[item.category] ? (
  //           <Image
  //             source={categoryIcons[item.category]}
  //             style={styles.categoryIcon}
  //             resizeMode="contain"
  //           />
  //         ) : null}
  //       </View>
  //     )}
  //   </View>
  // );
};

export default ChatItemImage;

const styles = StyleSheet.create({
  // 겹쳐진 프로필 이미지 컨테이너 (전체 70x70) - 1:1 채팅용
  overlappingProfilesContainer: {
    width: 70,
    height: 70,
    position: "relative",
  },
  // 상대방 프로필 래퍼 (왼쪽, 54x54)
  opponentProfileWrapper: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 54,
    height: 54,
    borderRadius: 27,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
  },
  // 내 프로필 래퍼 (오른쪽, 겹침, 54x54)
  myProfileWrapper: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 54,
    height: 54,
    borderRadius: 27,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  // 프로필 이미지 placeholder (원형)
  profileImagePlaceholder: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.gray[3],
  },
  // 프로필 이미지 (원형)
  profileImageCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.gray[4],
  },
  // 파티 이미지 래퍼 (네모) - 파티 채팅용
  partyImageWrapper: {
    width: 70,
    height: 70,
    borderRadius: 16,
    overflow: "hidden",
  },
  // 파티 이미지 (네모)
  partyImage: {
    width: 70,
    height: 70,
  },
  // 파티 이미지 placeholder (네모)
  partyImagePlaceholder: {
    width: 70,
    height: 70,
    backgroundColor: colors.sub,
    justifyContent: "center",
    alignItems: "center",
  },
  // 카테고리 아이콘
  categoryIcon: {
    width: 60,
    height: 60,
    padding: 2.5,
  },
});
