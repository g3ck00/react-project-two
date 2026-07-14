import Header from "./Header.tsx"
import SkipToContent from "./SkipToContent.tsx";

import {NavLink, Outlet} from 'react-router-dom';

interface LayoutProps {
    children:React.ReactNode;
    showHeader?:boolean;
}

function Layout({
    children,
    showHeader=true,
                }: LayoutProps){
    return(
        <div className="app-layout">
            <main className={"main-content"}>
                <SkipToContent/>
                {showHeader && <Header userName={"Bryant"}/>}
                {children}
                <Outlet/>
            </main>
        </div>
    );
}

export default Layout;