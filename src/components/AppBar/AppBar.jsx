import Navigation from "../Navigation/Navigation";
// import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";
import css from "./AppBar.module.scss";
import Logo from "../logo/Logo";
// import { useSelector } from "react-redux";
// import {
//   selectIsLoggedIn,
//   selectIsRefreshing,
// } from "../../redux/auth/selectors";

// import css from "./AppBar.module.css";

export default function AppBar() {
  //   const isLoggedIn = useSelector(selectIsLoggedIn);
  //   const isRefreshing = useSelector(selectIsRefreshing);

  return (
    <div className={css.bar}>
      <div className={css.bar__row}>
        <div className={css.bar__col}>
          <Logo />
        </div>
        <div className={css.bar__col}>
          <Navigation />

          <AuthNav/>
        </div>
      </div>
      {/* {!isRefreshing && <div> {isLoggedIn ? <UserMenu /> : <AuthNav />}</div>} */}
    </div>
  );
}
