import { useCallback, useRef, useState } from "react";

type TimerStatus = "pending" | "start" | "counting" | "done";

export const useTimer = (initialSeconds: number, onFinish?: () => void) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [status, setStatus] = useState<TimerStatus>("pending");
  const endTimeRef = useRef<number | null>(null);
  const requestRef = useRef<number | null>(null);

  const start = useCallback(() => {
    // 현재 시각 + 목표 시간을 종료 시각으로 설정
    endTimeRef.current = Date.now() + initialSeconds * 1000;
    setStatus("start");

    const update = () => {
      if (!endTimeRef.current) return;

      const now = Date.now();
      const remaining = Math.max(
        0,
        Math.ceil((endTimeRef.current - now) / 1000)
      );

      if (remaining <= 0) {
        setTimeLeft(0);
        setStatus("done");
        onFinish?.();
        return;
      }

      setTimeLeft(remaining);
      setStatus("counting");
      requestRef.current = setTimeout(update, 1000); // 1초 뒤 다시 계산
    };

    update();
  }, [initialSeconds, onFinish]);

  return { timeLeft, status, start };
};
