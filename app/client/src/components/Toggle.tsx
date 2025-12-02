import { useRef, useState } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonToggle, ToggleCustomEvent, useIonToast } from '@ionic/react';

function ControlToggle({ title, cardTitle, helperText, errorText }: { title: string, cardTitle: string, helperText: string, errorText: string }) {
    const wifiRef = useRef<HTMLIonToggleElement>(null);

    const [isTouched, setIsTouched] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean | undefined>();
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const validateToggle = (event: ToggleCustomEvent<{ checked: boolean }>) => {
        setIsTouched(true);
        setIsChecked(event.detail.checked);
        setIsValid(event.detail.checked);
        presentToast(event.detail.checked ? `${cardTitle} turned on` : `${cardTitle} turned off`)
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
                    ref={wifiRef}
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

export default ControlToggle;
