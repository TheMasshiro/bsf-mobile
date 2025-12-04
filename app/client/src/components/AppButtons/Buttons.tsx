import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

interface ClickableCardButton {
    title: string,
    content: string,
    color?: string,
    onClick?: () => void,
}

export function ClickableCardButton({ title, content, color, onClick }: ClickableCardButton) {
    return (
        <IonCard mode="ios" color={color} button onClick={onClick} style={{ cursor: 'pointer' }}>
            <IonCardHeader>
                <IonCardSubtitle>
                    {content}
                </IonCardSubtitle>
                <IonCardTitle>{title}</IonCardTitle>
            </IonCardHeader>
        </IonCard>
    );
}

interface OutlineButton {
    title: string,
    disabled?: boolean,
    onClick?: () => void,
}

export function OutlineButton({ title, disabled, onClick }: OutlineButton) {
    return (
        <IonButton fill="outline" onClick={onClick} disabled={disabled}>{title}</IonButton>
    )
}
