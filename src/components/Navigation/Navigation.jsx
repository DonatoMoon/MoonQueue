// src/components/Navigation.js
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import css from "./Navigation.module.scss";
import clsx from "clsx";

const makeLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
    const user = useSelector((state) => state.auth.user);

    return (
        <nav className={css.nav}>
            <div className={css.nav__item}>
                <NavLink className={makeLinkClass} to="/">
                    <div className={css.nav__button}>Home</div>
                </NavLink>
            </div>
            {user && (
                <>
                    <div className={css.nav__item}>
                        <NavLink className={makeLinkClass} to="/library">
                            <div className={css.nav__button}>My Library</div>
                        </NavLink>
                    </div>
                    <div className={css.nav__item}>
                        <NavLink className={makeLinkClass} to="/recommendation">
                            <div className={css.nav__button}>Recommendations</div>
                        </NavLink>
                    </div>
                </>
            )}
        </nav>
    );
}

// import {NavLink} from "react-router-dom";
// import css from "./Navigation.module.scss";
// import clsx from "clsx";
// // import { useSelector } from "react-redux";
// // import { selectIsLoggedIn } from "../../redux/auth/selectors";

// const makeLinkClass = ({isActive}) => {
//     return clsx(css.link, isActive && css.active);
// };

// export default function Navigation() {
//     //   const isLoggedIn = useSelector(selectIsLoggedIn);
//     return (
//         <nav className={css.nav}>
//             <div className={css.nav__item}>
//                 <NavLink className={makeLinkClass} to="/">
//                     <div className={css.nav__button}>Home</div>
//                 </NavLink>
//             </div>
//             <div className={css.nav__item}>
//                 <NavLink className={makeLinkClass} to="/library">
//                     <div className={css.nav__button}>My Library</div>
//                 </NavLink>
//             </div>
//             {/* {isLoggedIn && (
//         <NavLink className={makeLinkClass} to="/contacts">
//           My Library
//         </NavLink>
//       )} */}
//         </nav>
//     );
// }
