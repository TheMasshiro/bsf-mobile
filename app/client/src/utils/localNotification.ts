import { LocalNotifications } from "@capacitor/local-notifications";

export async function createActuatorNotifications(title: string, body: string) {
  await LocalNotifications.checkPermissions();
  const res = await LocalNotifications.requestPermissions();
  if (res.display === "granted") {
    LocalNotifications.createChannel({
      id: "1",
      name: "Actuators Alert",
      description: "Alerts for turning actuators on/off.",
    }).then(() =>
      LocalNotifications.schedule({
        notifications: [
          {
            channelId: "1",
            id: Math.ceil(Math.random() * 100),
            title: title,
            body: body,
            schedule: {
              allowWhileIdle: true,
            },
            ongoing: false,
            iconColor: "#0000FF",
          },
        ],
      }),
    );
  }
}
