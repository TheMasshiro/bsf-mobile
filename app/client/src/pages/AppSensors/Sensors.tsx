import { IonButtons, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Sensors.css';
import { SensorCard } from '../../components/AppCards/Cards';
import { useLifeCycle } from '../../context/LifeCycleContext';
import { FC } from 'react';

const SensorsPage: FC = () => {
    const { currentLifeCycle } = useLifeCycle()
    const stageLabels = {
        egg: 'Egg', larva: 'Larva', pupa: 'Pupa', adult:
            'Adult'
    };

    const sensors = [
        {
            name: "Photoperiod",
            value: 43200,
            unit: ' AM',
        },
        {
            name: "Temperature",
            value: 24.5,
            unit: '°C',
        },
        {
            name: "Humidity",
            value: 50,
            unit: '%',
        },
        {
            name: "Substrate Moisture",
            value: 60,
            unit: '%',
        },
        {
            name: "Ammonia",
            value: 25,
            unit: ' ppm',
        }
    ]


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Sensors</IonTitle>
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
                        <IonTitle size="large">Sensors</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonGrid>
                    <IonRow class="ion-justify-content-center ion-align-items-center">
                        <IonChip class="good-chip">
                            <IonLabel>Good</IonLabel>
                        </IonChip>
                        <IonChip class="warning-chip">
                            <IonLabel>Warning</IonLabel>
                        </IonChip>
                        <IonChip class="danger-chip">
                            <IonLabel>Danger</IonLabel>
                        </IonChip>
                    </IonRow>
                    <IonRow>
                        {sensors.map((sensor, index) => (
                            <IonCol key={index} size="12" sizeMd="6" sizeLg="4">
                                <SensorCard
                                    key={index}
                                    title={sensor.name}
                                    value={sensor.value}
                                    unit={sensor.unit}
                                ></SensorCard>
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default SensorsPage;
