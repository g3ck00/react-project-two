import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

import SkipToContent from "./SkipToContent.tsx";

import {NavLink, Outlet} from 'react-router-dom';
import Button from "./Button.tsx";
import {useAuth} from "../../hooks/useAuth.ts";
import AuthBar from "../AuthBar.tsx";

interface LayoutProps {
    children:React.ReactNode;
    showHeader?:boolean;
}

export default function Layout({

                                   //children,
    showHeader=true,
                }: LayoutProps){

    return(
        <div className="app-layout">
                {/*}<SkipToContent/>{*/}

            <AuthBar/>

                {showHeader && <Header userName={"Bryant"}/>}

                <nav style={{padding: "1rem"}}>
                    <NavLink to={"/"}>Home</NavLink>{" | "}
                    <NavLink to={"/tasks"}>Tasks</NavLink>{" | "}
                    <NavLink to={"/about"}>About</NavLink>{" | "}
                    <NavLink to={"/lab"}>Lab</NavLink>
                </nav>

                {/* children */}

                <main className={"main-content"}>

                    <Outlet/>

                </main>

                <br></br><Footer></Footer>
        </div>
    );
}