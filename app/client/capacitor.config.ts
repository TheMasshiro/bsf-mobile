import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "cpe.bsf.mobile",
  appName: "BSF Mobile",
  webDir: "dist",
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
    LocalNotifications: {
      iconColor: "#488AFF",
    },
  },
};

export default config;
