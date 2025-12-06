import { IonButtons, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, IonTitle, IonToolbar, RefresherCustomEvent } from '@ionic/react';
import './Analytics.css';
import BarGraph from '../../components/AppGraph/Graph';
import { useLifeCycle } from '../../context/LifeCycleContext';
import { lifecycleThresholds } from '../../config/LifeCycleThresholds';
import { FC } from 'react';

const AnalyticsPage: FC = () => {
    const { currentLifeCycle } = useLifeCycle()
    const stageLabels = {
        egg: 'Egg', larva: 'Larva', pupa: 'Pupa', adult:
            'Adult'
    };

    const thresholds = lifecycleThresholds[currentLifeCycle]

    const sensorGraphs = [
        {
            id: "1",
            sensor: "Temperature",
            max: thresholds.temperature.max,
            min: thresholds.temperature.min,
            warn: thresholds.temperature.optimal[1],
            unit: "°C"
        },
        {
            id: "2",
            sensor: "Humidity",
            max: thresholds.humidity.max,
            min: thresholds.humidity.min,
            warn: thresholds.humidity.optimal[1],
            unit: "%"
        },
        {
            id: "3",
            sensor: "Substrate Moisture",
            max: thresholds.moisture.max,
            min: thresholds.moisture.min,
            warn: thresholds.moisture.optimal[1],
            unit: "%"
        }
    ]

    const handleRefresh = (event: RefresherCustomEvent) => {
        setTimeout(() => {
            // Any calls to load data go here
            event.detail.complete();
        }, 2000);
    }

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

                <IonRefresher slot="fixed" pullFactor={0.5} pullMin={100} pullMax={200} onIonRefresh={handleRefresh}>
                    <IonRefresherContent>
                    </IonRefresherContent>
                </IonRefresher>

                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Analytics</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonSegment>
                                <IonSegmentButton value="temperature" contentId='1'>
                                    <IonLabel class="segment-label">Temperature °C</IonLabel>
                                </IonSegmentButton>
                                <IonSegmentButton value="humidity" contentId='2'>
                                    <IonLabel class="segment-label">Humidity %</IonLabel>
                                </IonSegmentButton>
                                <IonSegmentButton value="moisture" contentId='3'>
                                    <IonLabel class="segment-label">Moisture %</IonLabel>
                                </IonSegmentButton>
                            </IonSegment>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonSegmentView>
                                {sensorGraphs.map((graph, index) => (
                                    <IonSegmentContent key={index} id={graph.id} >
                                        <BarGraph
                                            key={index}
                                            sensorType={graph.sensor}
                                            upperLimit={graph.max}
                                            lowerLimit={graph.min}
                                            warningLimit={graph.warn}
                                            unit={graph.unit}
                                        ></BarGraph>
                                        <IonRow class="ion-justify-content-center ion-align-items-center legends-row">
                                            <IonChip color="secondary">{graph.sensor} {graph.unit}</IonChip>
                                            <IonChip color="danger">
                                                <IonLabel>Upper Limit: {graph.max} {graph.unit}</IonLabel>
                                            </IonChip>
                                            <IonChip color="warning">
                                                <IonLabel>Warning Limit: {graph.warn} {graph.unit}</IonLabel>
                                            </IonChip>
                                            <IonChip color="primary">
                                                <IonLabel>Lower Limit: {graph.min} {graph.unit}</IonLabel>
                                            </IonChip>
                                        </IonRow>
                                    </IonSegmentContent>
                                ))}
                            </IonSegmentView>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage >
    );
};

export default AnalyticsPage;
