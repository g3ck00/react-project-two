import {createContext, useContext, useState} from "react";

const TabsContext = createContext<TabsContextType | null>(null);

interface TabsContextType {
    activeIndex: number;
    setActiveIndex: (index: number) => void;
}

interface TabsProps {
    children: React.ReactNode;
    defaultIndex?: number;
}

interface TabProps {
    index: number;
    children: React.ReactNode;
}

interface TabPanelProps {
    index: number;
    children: React.ReactNode;
}

function Tabs({ defaultIndex = 0, children }: TabsProps) {
    const [activeIndex, setActiveIndex] = useState(defaultIndex);
    return (
        <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
            {children}
        </TabsContext.Provider>
    );
}

function Tab({ index, children }: TabProps) {
    const ctx = useContext(TabsContext)!;
    return (
        <button
            className={ctx.activeIndex === index ? 'tab-active' : ''}
            onClick={() => ctx.setActiveIndex(index)}
        >
            {children}
        </button>
    );
}

function TabPanel({ index, children }: TabPanelProps) {
    const ctx = useContext(TabsContext)!;
    if (ctx.activeIndex !== index) return null;
    return <div className="tab-panel">{children}</div>;
}

Tabs.Tab = Tab;
Tabs.TabPanel = TabPanel;

export default Tabs;
