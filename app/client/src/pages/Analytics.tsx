import { IonButtons, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Analytics.css';
import BarGraph from '../components/Graph';
import { useLifeCycle } from '../context/LifeCycleContext';
import { lifecycleThresholds } from '../config/LifeCycleThresholds';

const AnalyticsPage: React.FC = () => {
    const { currentLifeCycle } = useLifeCycle()
    const stageLabels = {
        egg: 'Egg', larva: 'Larva', pupa: 'Pupa', adult:
            'Adult'
    };

    const thresholds = lifecycleThresholds[currentLifeCycle]

    const sensorGraphs = [
        {
            sensor: "temperature",
            max: thresholds.temperature.max,
            min: thresholds.temperature.min,
            warn: thresholds.temperature.optimal[1]
        },
        {
            sensor: "humidity",
            max: thresholds.humidity.max,
            min: thresholds.humidity.min,
            warn: thresholds.humidity.optimal[1]
        },
        {
            sensor: "moisture",
            max: thresholds.moisture.max,
            min: thresholds.moisture.min,
            warn: thresholds.moisture.optimal[1]
        }
    ]

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Analytics</IonTitle>
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
                        <IonTitle size="large">Analytics</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {sensorGraphs.map((graph, index) => (
                    <BarGraph
                        key={index}
                        sensorType={graph.sensor}
                        upperLimit={graph.max}
                        lowerLimit={graph.min}
                        warningLimit={graph.warn}
                    ></BarGraph>
                ))}
            </IonContent>
        </IonPage>
    );
};

export default AnalyticsPage;
