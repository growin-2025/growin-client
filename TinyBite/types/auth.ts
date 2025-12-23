export type SignupGoogle = {
  idToken: string;
  phone: string;
  nickname: string;
  location: string;
  platform: "ANDROID" | "IOS";
};

export type LoginGoogle = {
  idToken: string;
  platformType: "ANDROID" | "IOS";
};

export type CheckSms = {
  phone: string;
  authCode: string;
};

export type UserCoords = {
  latitude: string;
  longitude: string;
};
