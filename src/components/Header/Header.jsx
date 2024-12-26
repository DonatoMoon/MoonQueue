import {useLocation} from "react-router-dom";
import AppBar from "../AppBar/AppBar";
import FilterForm from "../FilterForm/FilterForm";
import LibrarySwitcher from "../LibrarySwitcher/LibrarySwitcher";
import css from "./Header.module.scss";

export default function Header() {
    const location = useLocation();

    return (
        <header className={css.header}>
            <div className="container">
                <AppBar/>
                <div className={css.header__item}>
                    {location.pathname === "/" && <FilterForm/>}
                    {location.pathname === "/library" && <LibrarySwitcher/>}
                </div>
            </div>
        </header>
    );
}
