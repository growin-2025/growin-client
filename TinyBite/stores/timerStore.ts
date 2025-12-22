import { create } from "zustand";

type TimerStatus = "pending" | "start" | "counting" | "done";

interface TimerState {
  seconds: number;
  timeLeft: number;
  status: TimerStatus;
  intervalId: number | null;
  startTimer: (initialSeconds: number) => void;
  resetTimer: () => void;
}

export const useTimerStore = create<TimerState>((set, get) => ({
  seconds: 0,
  timeLeft: 0,
  status: "pending",
  intervalId: null,

  startTimer: (initialSeconds) => {
    const currentId = get().intervalId;
    if (currentId) clearInterval(currentId);

    set({
      seconds: Date.now() + initialSeconds * 1000,
      status: "counting",
    });

    const id = setInterval(() => {
      const { seconds } = get();

      const now = Date.now();
      const remaining = Math.max(0, Math.ceil((seconds - now) / 1000));

      if (remaining <= 0) {
        clearInterval(id);
        set({
          seconds: 0,
          timeLeft: 0,
          status: "done",
          intervalId: null,
        });
        return;
      }

      set({
        timeLeft: remaining,
      });
    }, 1000);

    set({ intervalId: id });
  },

  resetTimer: () => {
    const currentId = get().intervalId;
    if (currentId) clearInterval(currentId);
    set({ seconds: 0, status: "pending", intervalId: null });
  },
}));
