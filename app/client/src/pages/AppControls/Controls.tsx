import { IonButtons, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonListHeader, IonPage, IonRow, IonTitle, IonToolbar, useIonToast, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';
import './Controls.css';
import { ActuatorToggle } from '../../components/AppToggles/Toggles';
import { useLifeCycle } from '../../context/LifeCycleContext';
import { TimeSelection } from '../../components/AppRadioButtons/RadioButtons';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import { ActuatorControl } from '../../models/Models';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { platform, SqliteServiceContext, StorageServiceContext } from '../../App';
import { useQuerySQLite } from '../../hooks/UseQuerySQLite';

const ControlsPage: FC = () => {
    const ref = useRef(false);
    const dbNameRef = useRef('');
    const isInitComplete = useRef(false);
    const [states, setStates] = useState<ActuatorControl[]>([]);
    const [db, setDb] = useState<SQLiteDBConnection | null>(null);
    const sqliteServ = useContext(SqliteServiceContext);
    const storageServ = useContext(StorageServiceContext);

    const [present] = useIonToast()

    const { currentLifeCycle } = useLifeCycle()
    const stageLabels = {
        egg: 'Egg', larva: 'Larva', pupa: 'Pupa', adult:
            'Adult'
    };

    const openDatabase = () => {
        try {
            const dbName = storageServ.getDatabaseName();
            dbNameRef.current = dbName;
            const version = storageServ.getDatabaseVersion();

            sqliteServ.openDatabase(dbName, version, false).then((database) => {
                setDb(database);
                ref.current = true;
            }).catch((error) => {
                const msg = `Error open database:: ${error}`;
                console.error(msg);
                present({
                    message: msg,
                    duration: 2000,
                    position: "top",
                })
            });
        } catch (error) {
            const msg = `Error open database:: ${error}`;
            console.error(msg);
            present({
                message: msg,
                duration: 1500,
                position: "top",
            })
        }
    }

    const handleUpdateActuators = async (updActuator: ActuatorControl) => {
        if (db) {
            const isConn = await sqliteServ.isConnection(dbNameRef.current, false);
            await storageServ.updateActuatorControl(updActuator.lifeCycleStage, updActuator.fanState, updActuator.mistingState, updActuator.heaterState, updActuator.timeState)

            setStates(prevStates => prevStates.map(state =>
                state.lifeCycleStage === updActuator.lifeCycleStage
                    ? { ...state, ...updActuator }
                    : state
            ))
        }
    }

    useIonViewWillEnter(() => {
        const initSubscription = storageServ.isInitCompleted.subscribe((value) => {
            isInitComplete.current = value;
            if (isInitComplete.current === true) {
                const dbName = storageServ.getDatabaseName();
                if (ref.current === false) {
                    if (platform === "web") {
                        window.addEventListener('beforeunload', (event) => {
                            sqliteServ.closeDatabase(dbNameRef.current, false).then(() => {
                                ref.current = false;
                            }).catch((error) => {
                                const msg = `Error close database:: ${error}`
                                console.error(msg);
                                present({
                                    message: msg,
                                    duration: 1500,
                                    position: "top",
                                })
                            })
                        })
                        customElements.whenDefined('jeep-sqlite').then(() => {
                            openDatabase();
                        }).catch((error) => {
                            const msg = `Error open database:: ${error}`
                            console.error(msg)
                            present({
                                message: msg,
                                duration: 1500,
                                position: "top",
                            })
                        })
                    } else {
                        openDatabase();
                    }
                }
            }
        })

        return () => {
            initSubscription.unsubscribe();
        };
    }, [storageServ])

    useIonViewWillLeave(() => {
        sqliteServ.closeDatabase(dbNameRef.current, false).then(() => {
            ref.current = false;
        }).catch((error) => {
            const msg = `Error close database:: ${error}`;
            console.error(msg);
            present({
                message: msg,
                duration: 1500,
                position: "top",
            })
        })
    })

    useEffect(() => {
        if (isInitComplete.current === true && db) {
            const stmt = `SELECT * FROM actuator_control WHERE lifeCycleStage='${currentLifeCycle}'`;
            const values: any[] = [];
            const fetchData = useQuerySQLite(db, stmt, values);
            fetchData().then((fetchedStatesData) => {
                setStates(fetchedStatesData);
            }).catch((error) => {
                const msg = `Error fetching states data" ${error}`;
                console.error(msg);
                present({
                    message: msg,
                    duration: 1500,
                    position: "top",
                })
            })
        }
    }, [db, currentLifeCycle]);

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
                        <IonListHeader>Actuator Controllers</IonListHeader>
                        {controls.map((control, index) => (
                            <IonCol key={index} size="12" sizeMd="6" sizeLg="4">
                                <ActuatorToggle
                                    key={index}
                                    title={control.title}
                                    cardTitle={control.card}
                                    helperText={control.helper}
                                    errorText={control.error}
                                    onUpdateActuator={handleUpdateActuators}
                                    ActuatorState={states[0]}
                                ></ActuatorToggle>
                            </IonCol>
                        ))}
                    </IonRow>
                    <IonRow>
                        <IonListHeader>Light Controller</IonListHeader>
                        <IonCol>
                            <TimeSelection
                                onUpdateTime={handleUpdateActuators}
                                currentState={states[0]}
                            ></TimeSelection>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default ControlsPage;
