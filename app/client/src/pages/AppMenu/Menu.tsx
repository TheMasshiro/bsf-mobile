import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, RouterDirection, useIonRouter } from '@ionic/react';
import './Menu.css';
import { ClickableCardButton } from '../../components/AppButtons/Buttons';
import { PlainCard } from '../../components/AppCards/Cards';
import { FC } from 'react';

const MenuPage: FC = () => {
    const router = useIonRouter()

    const dynamicNavigate = (path: string, direction: RouterDirection) => {
        const action = direction === "forward" ? "push" : "pop";
        router.push(path, direction, action)
    }

    const navigateBack = () => {
        if (router.canGoBack()) {
            router.goBack()
        }
    }

    const options = [
        {
            name: "View Data",
            body: "View Backed Up Data",
            onClick: () => console.log("View Data Clicked")
        },
        {
            name: "Backup Data",
            body: "Manually Backup Data (Will overrite last backed up data",
            onClick: () => console.log("Backup Data Clicked")
        },
        {
            name: "Settings",
            body: "Open settings",
            onClick: () => dynamicNavigate("/menu/settings", "forward")
        },
        {
            name: "About",
            body: "About BSF Mobile",
            onClick: () => console.log("About Clicked")
        },
    ]

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Menu</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Menu</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonGrid>
                    {options.map((option, index) => (
                        <IonRow key={index}>
                            <IonCol>
                                <ClickableCardButton
                                    key={index}
                                    title={option.name}
                                    content={option.body}
                                    onClick={option.onClick}
                                ></ClickableCardButton>
                            </IonCol>
                        </IonRow>
                    ))}
                    <IonRow>
                        <IonCol>
                            <PlainCard
                                title={"Automatic Backup"}
                                content={"Data will be backed up every day at midnight"}
                            ></PlainCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage >
    );
};

export default MenuPage;
