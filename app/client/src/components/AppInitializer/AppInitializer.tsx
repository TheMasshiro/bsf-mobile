import { FC, useContext, useEffect, useRef, useState } from "react";
import { SqliteServiceContext } from "../../App";
import { StorageServiceContext } from "../../App";
import InitializeAppService from "../../services/initializeAppService";
import { IonSpinner, useIonToast } from "@ionic/react";

interface AppInitializerProps {
    children: any
}

const AppInitializer: FC<AppInitializerProps> = ({ children }) => {
    const ref = useRef(false);
    const sqliteService = useContext(SqliteServiceContext);
    const storageService = useContext(StorageServiceContext);
    const initializeAppService = new InitializeAppService(sqliteService,
        storageService);

    const [isInitialized, setIsInitialized] = useState(false);
    const [present] = useIonToast();

    useEffect(() => {
        const initApp = async (): Promise<void> => {
            try {
                await initializeAppService.initializeApp();
                setIsInitialized(true);
                return;
            } catch (error: any) {
                const msg = error.message ? error.message : error;
                present({
                    message: msg,
                    duration: 1500,
                    position: "top",
                })
            }
        };
        if (ref.current === false) {
            initApp();
            ref.current = true;
        }

    }, []);

    if (!isInitialized) {
        return <IonSpinner name="dots"></IonSpinner>
    }
    return <>{children}</>;
};

export default AppInitializer;
