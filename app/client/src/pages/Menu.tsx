import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Menu.css';
import { ClickableCardButton } from '../components/Buttons';
import { PlainCard } from '../components/Cards';

const MenuPage: React.FC = () => {
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
                <ClickableCardButton
                    title={"Profile"}
                    content={"Hello, User Name"}
                    onClick={() => { console.log("Profile Clicked") }}
                ></ClickableCardButton>
                <ClickableCardButton
                    title={"Backup Data"}
                    content={"Manually Backup Data"}
                    onClick={() => { console.log("Profile Clicked") }}
                ></ClickableCardButton>
                <ClickableCardButton
                    title={"View Data"}
                    content={"View backup data"}
                    onClick={() => { console.log("Profile Clicked") }}
                ></ClickableCardButton>
                <PlainCard
                    title={"Automatic Backup"}
                    content={"Data will be backed up every day at midnight"}
                ></PlainCard>
                <ClickableCardButton
                    title={"Settings"}
                    content={""}
                    onClick={() => { console.log("Profile Clicked") }}
                ></ClickableCardButton>
                <ClickableCardButton
                    title={"Sign Out"}
                    content={""}
                    color={"danger"}
                    onClick={() => { console.log("Profile Clicked") }}
                ></ClickableCardButton>
            </IonContent>
        </IonPage >
    );
};

export default MenuPage;
