import Header from "./Header.tsx"
import SkipToContent from "./SkipToContent.tsx";

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
            <SkipToContent/>
            {showHeader && <Header userName={"Bryant"}/>}

            <main id={"main-content"}>
                {children}
            </main>
        </div>
    );
}

export default Layout;