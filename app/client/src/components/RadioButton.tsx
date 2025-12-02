import { IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonItem, IonList, IonRadio, IonRadioGroup, IonCardSubtitle } from '@ionic/react';
import "./RadioButton.css"

interface Time {
    id: number;
    name: string;
    seconds: number;
}

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

const compareWith = (o1: Time, o2: Time) => {
    return o1.id === o2.id;
};

function TimeSelection() {
    return (
        <IonCard mode="ios">
            <IonCardHeader>
                <IonCardTitle>Select Time:</IonCardTitle>
                <IonCardSubtitle>Set time for light</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                <IonList mode="ios">
                    <IonRadioGroup
                        value={times[0]}
                        compareWith={compareWith}
                        onIonChange={(event) => console.log('Current value:', JSON.stringify(event.detail.value))}
                    >

                        {times.map((time) => (
                            <IonItem>
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
