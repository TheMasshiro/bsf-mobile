import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Notifications.css';

function NotificationsPage() {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Notifications</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Notifications</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonCard mode="ios">
                    <IonCardHeader>
                        <IonCardTitle>0 Notification</IonCardTitle>
                        <IonCardSubtitle>Notifications will show here.</IonCardSubtitle>
                    </IonCardHeader>
                </IonCard>
            </IonContent>
        </IonPage>
    );
}

export default NotificationsPage;
