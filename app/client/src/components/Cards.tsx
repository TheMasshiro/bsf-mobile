import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/react';


function PlainCard({ title, content, color }: { title: string, content: string, color: string }) {
    return (
        <IonCard mode="ios" color={color}>
            <IonCardHeader>
                <IonCardTitle>{title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{content}</IonCardContent>
        </IonCard>
    );
}

export default PlainCard;
