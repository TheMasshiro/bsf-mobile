// import { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { thermometerOutline, toggleOutline, notificationsCircleOutline, analyticsOutline, menuOutline } from 'ionicons/icons';

import SensorsPage from './pages/AppSensors/Sensors';
import ControlsPage from './pages/AppControls/Controls';
import NotificationsPage from './pages/AppNotifications/Notifications';
import AnalyticsPage from './pages/AppAnalytics/Analytics';
import MenuPage from './pages/AppMenu/Menu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import { LifeCycleButton } from './components/AppActionButtons/ActionButtons';
import { LifeCycleProvider } from './context/LifeCycleContext';
import { Capacitor } from '@capacitor/core';
import { createContext } from 'react';
import SqliteService from './services/sqliteService';
import DbVersionService from './services/dbVersionService';
import StorageService from './services/storageService';
import AppInitializer from './components/AppInitializer/AppInitializer';

export const platform = Capacitor.getPlatform();

// Singleton Services
export const SqliteServiceContext = createContext(SqliteService)
export const DbVersionServiceContext = createContext(DbVersionService)
export const StorageServiceContext = createContext(new StorageService(SqliteService, DbVersionService))

setupIonicReact();

const App: React.FC = () => {
    return (
        <SqliteServiceContext.Provider value={SqliteService}>
            <DbVersionServiceContext.Provider value={DbVersionService}>
                <StorageServiceContext.Provider value={new StorageService(SqliteService, DbVersionService)}>
                    <AppInitializer>
                        <IonApp>
                            <LifeCycleProvider>
                                <LifeCycleButton />
                                <IonReactRouter>
                                    <IonTabs>
                                        <IonRouterOutlet>
                                            <Route exact path="/sensors">
                                                <SensorsPage />
                                            </Route>
                                            <Route exact path="/controls">
                                                <ControlsPage />
                                            </Route>
                                            <Route exact path="/notifications">
                                                <NotificationsPage />
                                            </Route>
                                            <Route path="/analytics">
                                                <AnalyticsPage />
                                            </Route>
                                            <Route path="/menu">
                                                <MenuPage />
                                            </Route>
                                            <Route exact path="/">
                                                <Redirect to="/sensors" />
                                            </Route>
                                        </IonRouterOutlet>
                                        <IonTabBar slot="bottom">
                                            <IonTabButton tab="sensors" href="/sensors">
                                                <IonIcon aria-hidden="true" icon={thermometerOutline} />
                                                <IonLabel>Sensors</IonLabel>
                                            </IonTabButton>

                                            <IonTabButton tab="controls" href="/controls">
                                                <IonIcon aria-hidden="true" icon={toggleOutline} />
                                                <IonLabel>Controls</IonLabel>
                                            </IonTabButton>

                                            <IonTabButton tab="analytics" href="/analytics">
                                                <IonIcon aria-hidden="true" icon={analyticsOutline} />
                                                <IonLabel>Analytics</IonLabel>
                                            </IonTabButton>

                                            <IonTabButton tab="notifications" href="/notifications">
                                                <IonIcon aria-hidden="true" icon={notificationsCircleOutline} />
                                                <IonLabel>Notifications</IonLabel>
                                            </IonTabButton>

                                            <IonTabButton tab="menu" href="/menu">
                                                <IonIcon aria-hidden="true" icon={menuOutline} />
                                                <IonLabel>Menu</IonLabel>
                                            </IonTabButton>
                                        </IonTabBar>
                                    </IonTabs>
                                </IonReactRouter>
                            </LifeCycleProvider>
                        </IonApp>
                    </AppInitializer>
                </StorageServiceContext.Provider>
            </DbVersionServiceContext.Provider>
        </SqliteServiceContext.Provider>
    );
};

export default App;
