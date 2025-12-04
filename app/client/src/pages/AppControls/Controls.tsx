import { IonButtons, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Controls.css';
import { ActuatorToggle } from '../../components/AppToggles/Toggles';
import { useLifeCycle } from '../../context/LifeCycleContext';
import { TimeSelection } from '../../components/AppRadioButtons/RadioButtons';

const ControlsPage: React.FC = () => {
    const { currentLifeCycle } = useLifeCycle()
    const stageLabels = {
        egg: 'Egg', larva: 'Larva', pupa: 'Pupa', adult:
            'Adult'
    };

    const controls = [
        {
            title: "Reduces Temperature",
            card: "Fan",
            helper: "Fan is enabled",
            error: "Fan is disabled"
        },
        {
            title: "Increases Moisture",
            card: "Misting Device",
            helper: "Mist is enabled",
            error: "Mist is disabled"
        },
        {
            title: "Increases Temperature",
            card: "Heater",
            helper: "Heater is enabled",
            error: "Heater is disabled"
        }
    ]

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Controls</IonTitle>
                    <IonButtons slot="end">
                        <IonChip>
                            <IonLabel>{stageLabels[currentLifeCycle]} Stage</IonLabel>
                        </IonChip>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Controls</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonGrid>
                    <IonRow>
                        {controls.map((control, index) => (
                            <IonCol key={index} size="12" sizeMd="6" sizeLg="4">
                                <ActuatorToggle
                                    key={index}
                                    title={control.title}
                                    cardTitle={control.card}
                                    helperText={control.helper}
                                    errorText={control.error}
                                ></ActuatorToggle>
                            </IonCol>
                        ))}
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <TimeSelection></TimeSelection>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default ControlsPage;
