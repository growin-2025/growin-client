import "dotenv/config";

module.exports = {
  name: "한입만",
  slug: "TinyBite",
  owner: "tinybite-2025",
  version: "0.1.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "tinybite",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  updates: {
    url: "https://u.expo.dev/9b29b0aa-7e69-4749-894f-40efacaa1eb8",
  },
  runtimeVersion: {
    policy: "appVersion",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.tinybite2025.TinyBite",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
    splash: {
      backgroundColor: "#FE870F",
      image: "./assets/images/splash-icon-ios.png",
      resizeMode: "contain",
    },
  },
  android: {
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: "com.tinybite2025.TinyBite",
    splash: {
      backgroundColor: "#FE870F",
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
    },
  },
  web: {
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    "expo-font",
    [
      "expo-secure-store",
      {
        configureAndroidBackup: true,
        faceIDPermission: "Allow 한입만 to access your Face ID biometric data.",
      },
    ],
    "expo-web-browser",
    [
      "@react-native-google-signin/google-signin",
      {
        iosUrlScheme: process.env.EXPO_PUBLIC_GOOGLE_IOS_URL_SCHEME,
      },
    ],
    [
      "expo-location",
      {
        locationAlwaysAndWhenInUsePermission:
          "Allow 한입만 to use your location.",
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: "9b29b0aa-7e69-4749-894f-40efacaa1eb8",
    },
    googleWebClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    googleIosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  },
};
