import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { getStatus, lifecycleThresholds, Threshold } from '../config/LifeCycleThresholds';
import { useLifeCycle } from '../context/LifeCycleContext';
import { secondsToTime } from '../utils/convertToTime';

function SensorCard({ title, value, unit }: { title: string; value: number, unit: string }) {
    const { currentLifeCycle } = useLifeCycle()
    const thresholds = lifecycleThresholds[currentLifeCycle]

    const sensorTypeMap: Record<string, keyof typeof thresholds> = {
        "temperature": "temperature",
        "humidity": "humidity",
        "substrate moisture": "moisture",
        "ammonia": "ammonia",
        "photoperiod": "photoperiod"
    };

    const displayValue = title.toLowerCase() === "photoperiod"
        ? `${secondsToTime(value)} left`
        : `${value}${unit}`;

    const sensorType = sensorTypeMap[title.toLowerCase()];
    const cardColor = sensorType ? getStatus(value, thresholds[sensorType] as Threshold) :
        "medium";

    return (
        <IonCard mode="ios" color={cardColor}>
            <IonCardHeader>
                <IonCardTitle>{displayValue}</IonCardTitle>
                <IonCardSubtitle>{title}</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>Updated 2m ago.</IonCardContent>
        </IonCard>
    );
}
export default SensorCard;
