import {NavLink} from "react-router-dom";
import logo from "../../images/cinemania_logo.svg";
import cl from "./Logo.module.scss"

export default function Logo() {
    return (
        <div className={cl.logo}>
            <NavLink to="/">
                <img src={logo} alt="Cinemania logo"/>
                <span className={cl.logo__title}> MoonQueue</span>
                {/* <img src={logo} alt="Logo" /> */}
            </NavLink>
        </div>
    )
}

