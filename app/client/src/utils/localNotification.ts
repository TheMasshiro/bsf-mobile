import { LocalNotifications } from "@capacitor/local-notifications";

export const actuatorNotification = async ({ body }: { body: string }) => {
  await LocalNotifications.schedule({
    notifications: [
      {
        title: "BSF Mobile",
        body: body,
        id: Math.ceil(Math.random() * 100),
        schedule: { at: new Date(Date.now() + 1000 * 5) },
        ongoing: false,
      },
    ],
  });
};
