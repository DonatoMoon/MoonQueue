import { Link } from "react-router-dom";
import error404 from "../../images/404.svg";
// import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div>
      <img src={error404} alt="error 404" />
      <b>Упс... Сторінка не знайдена...</b>
      <p>
        Перейди <Link to="/">на головну</Link>
      </p>
    </div>
  );
}
