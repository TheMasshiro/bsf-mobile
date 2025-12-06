import { FC, useContext, useEffect, useRef } from "react";
import { SqliteServiceContext } from "../../App";
import { StorageServiceContext } from "../../App";
import InitializeAppService from "../../services/initializeAppService";
import { useIonToast } from "@ionic/react";

interface AppInitializerProps {
    children: any
}

const AppInitializer: FC<AppInitializerProps> = ({ children }) => {
    const ref = useRef(false);
    const sqliteService = useContext(SqliteServiceContext);
    const storageService = useContext(StorageServiceContext);
    const initializeAppService = new InitializeAppService(sqliteService,
        storageService);

    const [present] = useIonToast();

    useEffect(() => {
        const initApp = async (): Promise<void> => {
            try {
                const appInit = await initializeAppService.initializeApp();
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

    return <>{children}</>;
};

export default AppInitializer;
