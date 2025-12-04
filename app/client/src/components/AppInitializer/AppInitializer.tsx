import { FC, useContext, useEffect, useRef } from "react";
import { SqliteServiceContext } from "../../App";
import { StorageServiceContext } from "../../App";
import InitializeAppService from "../../services/initializeAppService";

interface AppInitializeProps {
    children: any
}

const AppInitializer: FC<AppInitializeProps> = ({ children }) => {
    const ref = useRef(false);
    const sqliteService = useContext(SqliteServiceContext);
    const storageService = useContext(StorageServiceContext);
    const initializeAppService = new InitializeAppService(sqliteService, storageService);

    useEffect(() => {
        const initApp = async (): Promise<void> => {
            try {
                const appInit = await initializeAppService.initializeApp()
                return;
            } catch (error: any) {
                const msg = error.message ? error.message : error;
            }
        }
        if (ref.current === false) {
            initApp();
            ref.current = true;
        }
    }, [])
    return <>{children}</>;
}

export default AppInitializer;
