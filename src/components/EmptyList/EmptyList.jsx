import css from "./EmptyList.module.css";
import { useSelector } from "react-redux";
import bober from "../../images/bober_.svg";

export default function EmptyList() {
  const activeTab = useSelector((state) => state.library.activeTab);

  return (
    <div>
      <p className={css.Empty}>
        Your{" "}
        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).toLowerCase()}{" "}
        list is empty!
      </p>
      {/* <img src={bober} alt="Empty list" className={css.Bober} /> */}
      <img
        src={`https://media.baamboozle.com/uploads/images/947043/53408d2f-7d10-4f7a-a7dd-03c67993bc29.gif`}
        alt="Empty list"
        className={css.Bober}
      />
    </div>
  );
}
