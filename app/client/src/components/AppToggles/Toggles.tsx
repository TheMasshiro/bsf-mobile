import { FC, useEffect, useState } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonToggle, ToggleCustomEvent, useIonToast } from '@ionic/react';
import { createActuatorNotifications } from '../../utils/localNotification';
import { ActuatorControl } from '../../models/Models';

interface ActuatorToggleProps {
    title: string,
    cardTitle: string,
    helperText: string,
    errorText: string,
    onUpdateActuator: (updActuator: ActuatorControl) => void,
    ActuatorState: ActuatorControl,
}

export const ActuatorToggle: FC<ActuatorToggleProps> = ({ title, cardTitle, helperText, errorText, onUpdateActuator, ActuatorState }) => {

    const [isTouched, setIsTouched] = useState<boolean>();
    const [isValid, setIsValid] = useState<boolean | undefined>();
    const [isChecked, setIsChecked] = useState<boolean>();

    useEffect(() => {
        if (ActuatorState) {
            switch (cardTitle.toLowerCase()) {
                case "fan":
                    setIsChecked(ActuatorState.fanState === 1);
                    break;
                case "misting device":
                    setIsChecked(ActuatorState.mistingState === 1);
                    break;
                case "heater":
                    setIsChecked(ActuatorState.heaterState === 1);
                    break;
            }
        }
    }, [ActuatorState, cardTitle]);

    const getNotificationId = () => {
        switch (cardTitle.toLocaleLowerCase()) {
            case "fan":
                return 1
            case "misting device":
                return 2
            case "heater":
                return 3
            default:
                return 1
        }
    }

    const validateToggle = async (event: ToggleCustomEvent<{ checked: boolean }>) => {
        setIsTouched(true);
        setIsChecked(event.detail.checked);
        setIsValid(event.detail.checked);

        const updatedActuator = { ...ActuatorState };
        const newValue = event.detail.checked ? 1 : 0;

        switch (cardTitle.toLowerCase()) {
            case "fan":
                updatedActuator.fanState = newValue;
                break;
            case "misting device":
                updatedActuator.mistingState = newValue;
                break;
            case "heater":
                updatedActuator.heaterState = newValue;
                break;
        }

        onUpdateActuator(updatedActuator);

        const message = event.detail.checked ? `${cardTitle} turned on` : `${cardTitle} turned off`;
        presentToast(message);
        await createActuatorNotifications(getNotificationId(), cardTitle, message);
    };


    const [present] = useIonToast();

    const presentToast = (message: string) => {
        present({
            message: message,
            duration: 500,
            position: "top",
            mode: "ios",
            layout: "stacked",
            swipeGesture: "vertical",
        })
    }

    return (
        <IonCard mode="ios">
            <IonCardHeader>
                <IonCardTitle>{cardTitle}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonToggle mode="ios"
                    className={`${isValid ? 'ion-valid' : ''} ${isValid === false ? 'ion-invalid' : ''} ${isTouched ? 'ion-touched' : ''
                        }`}
                    helperText={isChecked ? helperText : undefined}
                    errorText={!isChecked ? errorText : undefined}
                    justify="space-between"
                    checked={isChecked}
                    enableOnOffLabels={true}
                    onIonChange={(event) => validateToggle(event)}
                >
                    {title}
                </IonToggle>
            </IonCardContent>
        </IonCard>
    );
}
