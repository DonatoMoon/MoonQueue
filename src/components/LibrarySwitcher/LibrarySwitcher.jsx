import css from "./LibrarySwitcher.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../redux/library/slice";
import clsx from "clsx";

const makeButtonClass = (activeTab, tab) => {
  return clsx(css.switch__button, activeTab === tab && css.button__active);
};

export default function LibrarySwitcher() {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.library.activeTab);

  return (
    <ul className={css.switch}>
      <li>
        <button
          type="button"
          className={makeButtonClass(activeTab, "WATCHED")}
          onClick={() => dispatch(setActiveTab("WATCHED"))}
        >
          <p className={css.switch__text}>WATCHED</p>
        </button>
      </li>
      <li>
        <button
          type="button"
          className={makeButtonClass(activeTab, "QUEUE")}
          onClick={() => dispatch(setActiveTab("QUEUE"))}
        >
          <p className={css.switch__text}>QUEUE</p>
        </button>
      </li>
    </ul>
  );
}
