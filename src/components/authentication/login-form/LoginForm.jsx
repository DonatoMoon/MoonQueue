import { useState } from "react";
import classes from "./LoginForm.module.css";
// import ValidatedInput from '../../UI/validate-input/ValidatedInput';
// import eyeIconBlocked from "../../../source/eye-blocked.svg";
// import eyeIcon from "../../../source/eye-open.svg";
import cross from "../../../images/bober.gif";
// import { validateEmail} from '../../../utils/validation';
// import {useAuth} from "../../../utils/AuthContext";

const LoginForm = ({ setVisibleReg, setVisibleLog, setForgotPassword }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  //   const { login } = useAuth();
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setVisibleLog(false);
    setVisibleReg(true);
  };

  const allFieldsFilled = () => {
    return formData.email && formData.password;
  };

  const logAccount = () => {
    // const checkEmail = validateEmail(formData.email);
    // if (allFieldsFilled() && checkEmail.isValid) {
    //   const closePopup = login(formData.email, formData.password);
    //   if (closePopup) setVisibleLog(false);
    //   console.log("Всі умови виконані");
    // }
  };

  return (
    <div className={classes.input__box}>
      <div>
        <div className={classes.input__box__header}>
          <h1>Вхід</h1>
          <h2>Ласкаво просимо назад!</h2>
          <button
            style={{ background: "transparent", cursor: "default" }}
            onClick={() => setVisibleLog(false)}
          >
            <img src={cross} alt="" className={classes.cross} />
          </button>
        </div>
        <div>
          <h1 className={classes.input__box__label}>Вхід у ваш аккаунт</h1>
          {/* <ValidatedInput
            label="Електронна пошта"
            placeholder="Електронна пошта"
            name="email"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
            validationFunction={validateEmail}
          />
          <ValidatedInput
            name="password"
            label="Пароль"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Пароль"
            icon={isPasswordVisible ? eyeIconBlocked : eyeIcon}
            onIconClick={togglePasswordVisibility}
            value={formData.password}
            onChange={(e) => updateFormData("password", e.target.value)}
          /> */}
          <div className={classes.input__box__addition}>
            <div className={classes.input__box__stay}>
              <label className={classes.customcheckbox}>
                <input type="checkbox" id="remember-me" />
                <span className={classes.checkmark}></span>
                {/* Запам'ятати мене */}
              </label>
            </div>
            <div>
              <button
                className={classes.input__box__forget}
                onClick={() => {
                  setVisibleLog(false);
                  setForgotPassword(true);
                }}
              >
                Забули пароль?
              </button>
            </div>
          </div>

          <button style={{ background: "transparent" }}>
            <div className={classes.login} onClick={logAccount}>
              Продовжити
            </div>
          </button>
          <div className={classes.notregistered}>
            Новий користувач?&nbsp;
            <button
              className={classes.notregistered__link}
              style={{ background: "transparent" }}
              onClick={handleSubmit}
            >
              Зареєструйтесь тут!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
