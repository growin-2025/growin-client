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
