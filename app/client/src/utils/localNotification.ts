import { LocalNotifications } from "@capacitor/local-notifications";

interface actuatorNotification {
  title: string;
  body: string;
}

export const actuatorNotification = async ({
  title,
  body,
}: actuatorNotification) => {
  await LocalNotifications.schedule({
    notifications: [
      {
        title,
        body,
        id: Date.now(),
      },
    ],
  });
};
