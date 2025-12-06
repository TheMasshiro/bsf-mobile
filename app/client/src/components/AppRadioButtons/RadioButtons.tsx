import { FC, useEffect, useState } from 'react';
import { IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonItem, IonList, IonRadio, IonRadioGroup, IonCardSubtitle, useIonToast } from '@ionic/react';
import "./RadioButtons.css"
import { secondsToTime } from '../../utils/utilities';
import { createActuatorNotifications } from '../../utils/localNotification';
import { ActuatorControl } from '../../models/Models';

interface Time {
    id: number;
    name: string;
    seconds: number;
}

interface TimeSelectionProps {
    onUpdateTime: (updActuator: ActuatorControl) => Promise<void>;
    currentState?: ActuatorControl;
}

export const TimeSelection: FC<TimeSelectionProps> = ({ onUpdateTime, currentState }) => {
    const compareWith = (o1: Time, o2: Time) => {
        return o1.id === o2.id;
    };

    const times: Time[] = [
        {
            id: 1,
            name: 'Disabled',
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

    const [selectedTime, setSelectedTime] = useState<Time>(times[0]);

    useEffect(() => {
        if (currentState?.timeState !== undefined) {
            const matchingTime = times.find(t => t.seconds === currentState.timeState) || times[0];
            setSelectedTime(matchingTime);
        }
    }, [currentState]);

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
        <IonCard>
            <IonCardHeader>
                <IonCardSubtitle>Set time for light</IonCardSubtitle>
                <IonCardTitle>Select Time:</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonList inset={true}>
                    <IonRadioGroup
                        value={selectedTime}
                        compareWith={compareWith}
                        onIonChange={async (event) => {
                            const newTime = event.detail.value;
                            setSelectedTime(newTime);

                            if (onUpdateTime && currentState) {
                                const updatedState = {
                                    ...currentState,
                                    timeState: newTime.seconds
                                };
                                await onUpdateTime(updatedState);
                            }

                            const message = newTime.seconds ? `Light timer set to ${secondsToTime(newTime.seconds)}` : `Light timer disabled`;
                            presentToast(message);
                            await createActuatorNotifications(4, "Light Timer", message);
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
        </IonCard >
    );
}
