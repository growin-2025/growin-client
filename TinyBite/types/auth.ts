export type SignupGoogle = {
  idToken: string;
  phone: string;
  nickname: string;
  location: string;
  platform: "ANDROID" | "IOS";
  agreedTerms: string[];
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
export type SignupRespone = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: UserProfile;
};

export type LoginRespone = {
  signup: boolean;
  authResponse: {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    user: UserProfile;
  };
};

export type UserProfile = {
  userId: number;
  email: string;
  nickname: string;
  type: string;
  status: string;
  location: string;
  phone: string;
  createdAt: string;
  isNewUser: boolean;
};
