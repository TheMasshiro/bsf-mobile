import { IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/react';
import { useLifeCycle } from '../context/LifeCycleContext';
import {
    ellipse, bug, leaf, flower, chevronDownCircle,
} from 'ionicons/icons';

import './ActionButton.css';

function LifeCycleButton() {
    const { currentLifeCycle, setCurrentLifeCycle } = useLifeCycle();

    const stages: Array<"egg" | "larva" | "pupa" | "adult"> = ["egg", "larva",
        "pupa", "adult"];
    const stageIcon: Record<"egg" | "larva" | "pupa" | "adult", string> = {
        "egg": ellipse,
        "larva": bug,
        "pupa": leaf,
        "adult": flower
    };

    return (
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
            <IonFabButton mode="ios" size="small">
                <IonIcon icon={chevronDownCircle}></IonIcon>
            </IonFabButton>
            <IonFabList side="top">
                {stages.map((stage) => (
                    <IonFabButton key={stage}
                        color={currentLifeCycle === stage ? "primary" : "medium"}
                        onClick={() => setCurrentLifeCycle(stage as "egg" | "larva" | "pupa" | "adult")}
                    >
                        <IonIcon icon={stageIcon[stage]}></IonIcon>
                    </IonFabButton>
                ))}
            </IonFabList>
        </IonFab >
    )
}

export default LifeCycleButton;
