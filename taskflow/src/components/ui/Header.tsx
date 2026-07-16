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
            <h1>TaskFlow - Task Manager</h1>

            <nav className={"app-nav"}>

            <div className={"header-user"}>
                Guten tag, {userName}!
            </div>

            <div>
            </div>
            </nav>
        </header>
    )
}

export default Header