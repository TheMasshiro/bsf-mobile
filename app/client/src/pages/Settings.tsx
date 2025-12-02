import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Settings.css';
import ClickableCard from '../components/Buttons';
import PlainCard from '../components/Cards';

const SettingsPage: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Settings</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Settings</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <ClickableCard
                    title={"Profile"}
                    content={"Hello, User Name"}
                    onClick={() => { console.log("Profile Clicked") }}
                ></ClickableCard>
                <ClickableCard
                    title={"Backup Data"}
                    content={"Manually Backup Data"}
                    color={"tertiary"}
                    onClick={() => { console.log("Profile Clicked") }}
                ></ClickableCard>
                <PlainCard
                    title={"Automatic Backup"}
                    color={"primary"}
                    content={"Data will be backed up every day at midnight"}
                ></PlainCard>
                <ClickableCard
                    title={"Sign Out"}
                    content={""}
                    color={"danger"}
                    onClick={() => { console.log("Profile Clicked") }}
                ></ClickableCard>
            </IonContent>
        </IonPage >
    );
};

export default SettingsPage;
