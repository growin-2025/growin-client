export const formatSeconds = (totalSeconds: number) => {
  const min = Math.floor(totalSeconds / 60);
  const sec = totalSeconds % 60;
  return `${min}:${sec < 10 ? `0${sec}` : sec}`; // 180 -> "03:00"
};
