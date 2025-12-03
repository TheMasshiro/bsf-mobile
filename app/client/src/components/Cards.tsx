import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/react';

function PlainCard({ title, content, color }: { title: string, content: string, color: string }) {
    return (
        <IonCard mode="ios" color={color}>
            <IonCardHeader>
                <IonCardSubtitle>{content}</IonCardSubtitle>
                <IonCardTitle>{title}</IonCardTitle>
            </IonCardHeader>
        </IonCard>
    );
}

export default PlainCard;
