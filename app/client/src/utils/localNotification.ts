import { LocalNotifications } from "@capacitor/local-notifications";

export async function createActuatorNotifications(body: string) {
  const check = await LocalNotifications.checkPermissions();
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
            id: 1,
            title: `BSF Mobile`,
            body: body,
            schedule: {
              at: new Date(Date.now() + 1000),
              allowWhileIdle: true,
            },
            ongoing: false,
          },
        ],
      }),
    );
  }
}
