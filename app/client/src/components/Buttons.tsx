import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

export function ClickableCard({ title, content, color, onClick }: { title: string, content: string, color?: string, onClick?: () => void }) {
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

export function Button({ title, disabled, onClick }: { title: string, disabled?: boolean, onClick?: () => void }) {
    return (
        <IonButton fill="outline" onClick={onClick} disabled={disabled}>{title}</IonButton>
    )
}
