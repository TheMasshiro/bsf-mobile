import { createContext, ReactNode, useContext, useState } from "react";

type LifeCycleStage = "egg" | "larva" | "pupa" | "adult";

const LifeCycleContext = createContext<{
    currentLifeCycle: LifeCycleStage;
    setCurrentLifeCycle: (stage: LifeCycleStage) => void;
} | undefined>(undefined);

export function LifeCycleProvider({ children }: { children: ReactNode }) {
    const [currentLifeCycle, setCurrentLifeCycle] = useState<LifeCycleStage>("egg");

    return (
        <LifeCycleContext.Provider
            value={
                { currentLifeCycle, setCurrentLifeCycle }
            }>
            {children}
        </LifeCycleContext.Provider>

    )
}

export function useLifeCycle() {
    const context = useContext(LifeCycleContext);
    if (!context) throw new Error("useLifeCycle must be used within LifeCycleProvider")
    return context;
}
