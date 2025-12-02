import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';

function ClickableCard({ title, content, color, onClick }: { title: string, content: string, color?: string, onClick?: () => void }) {
    return (
        <IonCard mode="ios" color={color} button onClick={onClick} style={{ cursor: 'pointer' }}>
            <IonCardHeader>
                <IonCardTitle>{title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                {content}
            </IonCardContent>
        </IonCard>
    );
}
export default ClickableCard;
