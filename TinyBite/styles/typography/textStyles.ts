import { fontScale } from "@/styles/typography/scale";

export const textStyles = {
  /* ---------- Title ---------- */
  title24_SB135: {
    ...fontScale.title[24][135],
    fontFamily: "Pretendard-SemiBold",
  },

  title20_B135: {
    ...fontScale.title[20][135],
    fontFamily: "Pretendard-Bold",
  },

  title20_SB135: {
    ...fontScale.title[20][135],
    fontFamily: "Pretendard-SemiBold",
  },

  title18_SB135: {
    ...fontScale.title[18][135],
    fontFamily: "Pretendard-SemiBold",
  },

  /* ---------- Body ---------- */
  body16_B150: {
    ...fontScale.body[16][150],
    fontFamily: "Pretendard-Bold",
  },

  body16_SB150: {
    ...fontScale.body[16][150],
    fontFamily: "Pretendard-SemiBold",
  },

  body16_SB135: {
    ...fontScale.body[16][135],
    fontFamily: "Pretendard-SemiBold",
  },

  body16_M135: {
    ...fontScale.body[16][135],
    fontFamily: "Pretendard-Medium",
  },

  body15_SB135: {
    ...fontScale.body[15][135],
    fontFamily: "Pretendard-SemiBold",
  },

  body13_SB135: {
    ...fontScale.body[13][135],
    fontFamily: "Pretendard-SemiBold",
  },

  body13_SB150: {
    ...fontScale.body[13][150],
    fontFamily: "Pretendard-SemiBold",
  },

  body13_M135: {
    ...fontScale.body[13][135],
    fontFamily: "Pretendard-Medium",
  },

  body12_M135: {
    ...fontScale.body[12][135],
    fontFamily: "Pretendard-Medium",
  },
} as const;
