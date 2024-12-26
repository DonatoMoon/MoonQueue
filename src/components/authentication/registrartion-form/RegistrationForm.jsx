import { useState } from "react";
import classes from "./RegistrationForm.module.css";
// import ValidatedInput from '../../UI/validate-input/ValidatedInput';
// import eyeIcon from './../../../source/eye.svg';
import cross from "./../../../images/bober_.svg";
// import { validateEmail, validatePassword, validateConfirmPassword, validateName, validatePhone } from '../../../utils/validation';
// import {useFetching} from "../../../hooks/useFetching";
import axios from "axios";
// import {useAuth} from "../../../utils/AuthContext";

const RegistrationForm = ({
  setVisibleReg,
  setVisibleLog,
  setVisibleForgotPassword,
}) => {
  // const { login } = useAuth()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isProblem, setIsProblem] = useState({
    name: true,
    email: true,
    password: true,
    confirmPassword: true,
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    number: "",
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const allFieldsFilled = () => {
    return (
      formData.name &&
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      formData.number
    );
  };

  const allFieldsValid = () => {
    return Object.values(isProblem).every((value) => value === false);
  };

  const [sendRequest, isSending, sendError] = useFetching(async (newUser) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        newUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Помилка запиту");
    }
  });

  const regAccount = async () => {
    if (allFieldsFilled() && allFieldsValid()) {
      const newUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        number: formData.number,
      };
      const response = await sendRequest(newUser);
      if (response) {
        // login(formData.email, formData.password)
      }
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setVisibleReg(false);
    setVisibleLog(true);
  };
  return (
    <div className={classes.input__box}>
      <div>
        <div className={classes.input__box__header}>
          <h1>Реєстрація</h1>
          <h2>Давайте розпочнемо!</h2>
          <button
            style={{ background: "transparent", cursor: "default" }}
            onClick={() => setVisibleReg(false)}
          >
            <img src={cross} alt="" className={classes.cross} />
          </button>
        </div>
        <div style={{ position: "relative" }}>
          <div className={classes.input__box__label}>Створити аккаунт</div>
          {/* <ValidatedInput
            label="Ваше ім'я"
            placeholder="Ваше ім'я"
            name="name"
						value={formData.name}
						onChange={(e)=>updateFormData('name', e.target.value)}
						setIsProblem={setIsProblem}
						validationFunction={validateName}
          />
          <ValidatedInput
            label="Електронна пошта"
            placeholder="Електронна пошта"
            name="email"
						value={formData.email}
						onChange={(e)=>updateFormData('email', e.target.value)}
						setIsProblem={setIsProblem}
						validationFunction={validateEmail}
          /> */}
          {/* <ValidatedInput
            label="Мобільний телефон"
            placeholder="Мобільний телефон"
            name="phone"
            type="number"
						value={formData.number}
						onChange={(e)=>updateFormData('number', e.target.value)}
						setIsProblem={setIsProblem}
						validationFunction={validatePhone}
          />
          <ValidatedInput
						name="password"
						label="Створіть пароль"
						type={isPasswordVisible ? 'text' : 'password'}
						placeholder="Створіть пароль"
						icon={eyeIcon}
						onIconClick={togglePasswordVisibility}
						value={formData.password}
						onChange={(e)=>updateFormData('password', e.target.value)}
						setIsProblem={setIsProblem}
						validationFunction={validatePassword}
					/> */}
          {/* <ValidatedInput
						label="Підтвердіть пароль"
						name="confirmPassword"
						type={isPasswordVisible ? 'text' : 'password'}
						placeholder="Підтвердіть пароль"
						icon={eyeIcon}
						onIconClick={togglePasswordVisibility}
						value={formData.confirmPassword}
						setIsProblem={setIsProblem}
						onChange={(e)=>updateFormData('confirmPassword', e.target.value)}
						validationFunction={validateConfirmPassword}
						compareTo={formData.password}
					/> */}
          <button style={{ background: "transparent" }} onClick={regAccount}>
            <div className={classes.registration}>{/* Почати */}</div>
          </button>
          <div className={classes.alreadylogin}>
            Уже маєте аккаунт?&nbsp;
            <button
              className={classes.alreadylogin__link}
              style={{ background: "transparent" }}
              onClick={handleSubmit}
            >
              ЗАЛОГІНЬТЕСЬ ТУТ!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
