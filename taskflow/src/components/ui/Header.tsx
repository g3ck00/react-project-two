import {NavLink} from "react-router-dom";

interface HeaderProps{
    userName:string;
}

function Header({userName}: HeaderProps){

    return (
        <header
            className={"header"}
            role={"banner"}
        >
            <h1>TaskFlow - Gestor de Tareas</h1>

            <div className={"header-user"}>
                ¡Hola, {userName}!
            </div>

            <div>
                <nav className={"header-nav"}>
                    <NavLink to={"/"}>[ Inicio | </NavLink><NavLink to={"/tasks"}> Tareas |</NavLink><NavLink to={"/about"}> Acerca de ]</NavLink>
                </nav>
            </div>
        </header>
    )
}

export default Header