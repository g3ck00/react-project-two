import Button from "./ui/Button.tsx";
import RegisterPage from "./RegisterPage.tsx";
import {Link} from "react-router-dom";

export default function AuthBar(){
    //...

    return(
        <>
            <Link to={"/register"}>
                <Button>
                    Register [DUMMY]
                </Button>
            </Link>

        <Button>
            Login [DUMMY]
        </Button>
        </>
    )
}