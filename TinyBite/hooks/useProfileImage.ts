import { postFile } from "@/api/partyApi";
import { deleteProfileImage, updateProfileImage } from "@/api/userApi";
import { ApiError } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";

interface UseProfileImageOptions {
  onSuccess?: () => void;
  onError?: () => void;
}

/**
 * 프로필 이미지 변경 관련 로직을 관리하는 커스텀 훅
 * - 이미지 선택 (카메라/갤러리)
 * - 이미지 업로드 및 업데이트
 * - 이미지 삭제
 */
export const useProfileImage = (options?: UseProfileImageOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError } = options || {};

  // 프로필 이미지 업데이트 mutation
  const updateProfileImageMutation = useMutation({
    mutationFn: updateProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserMe"] });
      Toast.show({
        type: "basicToast",
        props: { text: "프로필 이미지가 변경되었습니다." },
        position: "bottom",
        bottomOffset: 98,
        visibilityTime: 2000,
      });
      onSuccess?.();
    },
    onError: (error: AxiosError<ApiError>) => {
      Toast.show({
        type: "error",
        text1: "프로필 이미지 변경에 실패했습니다.",
      });
      onError?.();
    },
  });

  // 프로필 이미지 삭제 mutation
  const deleteProfileImageMutation = useMutation({
    mutationFn: deleteProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserMe"] });
      Toast.show({
        type: "basicToast",
        props: { text: "프로필 이미지가 삭제되었습니다." },
        position: "bottom",
        bottomOffset: 98,
        visibilityTime: 2000,
      });
      onSuccess?.();
    },
    onError: (error: AxiosError<ApiError>) => {
      Toast.show({
        type: "error",
        text1: "프로필 이미지 삭제에 실패했습니다.",
      });
      onError?.();
    },
  });

  // 로딩 상태 확인 (이미지 업로드 또는 삭제 중)
  const isPending =
    updateProfileImageMutation.isPending ||
    deleteProfileImageMutation.isPending;

  // 권한 체크 함수
  const checkPermission = async (source: "camera" | "gallery") => {
    const permissionResult =
      source === "camera"
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      const sourceName = source === "camera" ? "카메라" : "갤러리";
      Alert.alert(
        "권한이 필요해요",
        `${sourceName}를 사용하려면 기기의 ${sourceName} 접근 권한을 허용해 주세요.`
      );
      return false;
    }
    return true;
  };

  // 이미지 선택 핸들러
  const handleImagePicker = async (source: "camera" | "gallery") => {
    try {
      // 권한 체크
      const hasPermission = await checkPermission(source);
      if (!hasPermission) {
        return;
      }

      // 이미지 선택
      const result =
        source === "camera"
          ? await ImagePicker.launchCameraAsync({
              mediaTypes: ["images"],
              allowsEditing: true,
              quality: 1,
            })
          : await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ["images"],
              allowsEditing: true,
              quality: 1,
            });

      if (!result.canceled) {
        const asset = result.assets[0];

        // 이미지 최적화 (리사이즈 및 압축)
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          asset.uri,
          [{ resize: { width: 512 } }],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );

        const imageUri = manipulatedImage.uri;
        const fileName = asset.fileName || "photo";
        const mimeType = asset.mimeType || "image/jpeg";

        // 이미지 업로드
        // postFile 실패 시 catch 블록으로 전달되어 onError 호출됨
        const uploadedImages = await postFile([
          {
            id: Date.now(),
            imageUri,
            fileName,
            mimeType,
          },
        ]);

        // 업로드된 이미지 데이터 검증
        const uploadedImage = uploadedImages?.[0];
        if (!uploadedImage) {
          throw new Error("이미지 업로드에 실패했습니다.");
        }

        updateProfileImageMutation.mutate(uploadedImage);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "이미지 선택에 실패했습니다.",
      });
      onError?.();
    }
  };

  // 이미지 삭제 핸들러
  const handleDeleteImage = () => {
    deleteProfileImageMutation.mutate();
  };

  return {
    handleImagePicker,
    handleDeleteImage,
    isPending,
  };
};
