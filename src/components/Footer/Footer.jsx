import css from "./Footer.module.scss";
/* імпорти лого/іконок */
import facebook from "../../images/icons/facebook.svg";
import instagram from "../../images/icons/instagram.svg";
import twitter from "../../images/icons/twitter.svg";
import youtube from "../../images/icons/youtube.svg";

import Logo from "../logo/Logo";

export default function Footer() {
    return (
      <div className={css.footer}>
        <div className="container">
          <div className={css.footer__row}>
            <div className={css.footer__col}>
              <Logo />
            </div>

            <div className={css.footer__col}>
              <div className={css.footer__social}>
                <div className={css.footer__social__icon}>
                  <a href="#">
                    <img src={facebook} alt="" />
                  </a>
                </div>
                <div className={css.footer__social__icon}>
                  <a href="#">
                    <img src={instagram} alt="" />
                  </a>
                </div>
                <div className={css.footer__social__icon}>
                  <a href="#">
                    <img src={twitter} alt="" />
                  </a>
                </div>
                <div className={css.footer__social__icon}>
                  <a href="#">
                    <img src={youtube} alt="" />
                  </a>
                </div>
              </div>

            </div>

            <div className={css.footer__col}>
              <div className={css.footer__contact}>
                <div className={css.footer__contact__title}>Contact Us</div>
                <div className={css.footer__contact__row}>
                  <div className={css.footer__contact__col}>
                    <p className={css.footer__contact__subtitle}>Phone:</p>
                    <p className={css.footer__contact__subtitle}>Mail:</p>
                  </div>
                  <div className={css.footer__contact__col}>
                    <p>123-456-7890</p>
                    <p>support@moon.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
