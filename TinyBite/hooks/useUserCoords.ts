import * as Location from "expo-location";
import { useCallback, useState } from "react";

export const useUserCoords = () => {
  const [coords, setCoords] = useState<Location.LocationObjectCoords | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserCoords = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (__DEV__) {
        const defaultCoords = {
          latitude: 37.5665,
          longitude: 126.978,
          altitude: 0,
          accuracy: 0,
          altitudeAccuracy: 0,
          heading: 0,
          speed: 0,
        } as Location.LocationObjectCoords;
        setCoords(defaultCoords);
        console.log("개발 모드: 기본 위치(서울) 사용");
        return defaultCoords;
      }

      // 1. 위치 권한 요청
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== Location.PermissionStatus.GRANTED) {
        setError("위치 권한이 거부되었습니다.");
        alert("위치 권한을 허용해주세요.");
        setLoading(false);
        return;
      }

      // 2. 디바이스 위치 서비스 활성 여부 확인
      const servicesEnabled = await Location.hasServicesEnabledAsync();
      if (!servicesEnabled) {
        setError("위치 서비스가 비활성화 상태입니다.");
        alert("디바이스의 위치 서비스를 켜주세요.");
        setLoading(false);
        return;
      }

      // 3. 현재 위치 가져오기
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setCoords(location.coords);
      console.log("현재 위치 획득:", location.coords);
      return location.coords;
    } catch (e) {
      console.error("위치 가져오기 실패, Fallback 시도:", e);

      // 최근에 알려진 위치 시도
      const lastLocation = await Location.getLastKnownPositionAsync();
      if (lastLocation) {
        setCoords(lastLocation.coords);
        alert("최근 위치 정보를 사용합니다.");
        return lastLocation.coords;
      } else {
        setError("위치 정보를 가져올 수 없습니다.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { coords, loading, error, refresh: fetchUserCoords };
};
