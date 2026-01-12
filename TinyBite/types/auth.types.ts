export type SignupGoogleRequest = {
  idToken: string;
  phone: string;
  nickname: string;
  location: string;
  platform: "ANDROID" | "IOS";
  agreedTerms: string[];
};

export type LoginGoogleRequest = {
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

export type LoginResponse = {
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
  nickname: string;
  location: string;
  userProfileImage?: string;
};
