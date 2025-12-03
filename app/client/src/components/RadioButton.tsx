import { IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonItem, IonList, IonRadio, IonRadioGroup, IonCardSubtitle, useIonToast } from '@ionic/react';
import "./RadioButton.css"
import { secondsToTime } from '../utils/convertToTime';

interface Time {
    id: number;
    name: string;
    seconds: number;
}




function TimeSelection() {
    const compareWith = (o1: Time, o2: Time) => {
        return o1.id === o2.id;
    };

    const times: Time[] = [
        {
            id: 1,
            name: '0 Hour',
            seconds: 0,
        },
        {
            id: 2,
            name: '8 Hours',
            seconds: 28800,
        },
        {
            id: 3,
            name: '12 Hours',
            seconds: 43200,
        },
    ];
    const [present] = useIonToast()
    const presentToast = (message: string) => {
        present({
            message: message,
            duration: 1500,
            position: "top",
            mode: "ios",
            layout: "stacked",
            swipeGesture: "vertical",
        })
    }
    return (
        <IonCard mode="ios">
            <IonCardHeader>
                <IonCardSubtitle>Set time for light</IonCardSubtitle>
                <IonCardTitle>Select Time:</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonList>
                    <IonRadioGroup
                        value={times[0]}
                        compareWith={compareWith}
                        onIonChange={(event) => {
                            presentToast(event.detail.value.seconds ? `Light timer set to ${secondsToTime(event.detail.value.seconds)}` : `Light timer disabled`)
                        }}
                    >
                        {times.map((time) => (
                            <IonItem key={time.id}>
                                <IonRadio key={time.id} value={time}>
                                    {time.name}
                                </IonRadio>
                            </IonItem>
                        ))}
                    </IonRadioGroup>
                </IonList>
            </IonCardContent>
        </IonCard>
    );
}
export default TimeSelection;
