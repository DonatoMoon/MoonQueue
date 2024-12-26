// src/components/RegistrationForm/RegistrationForm.jsx
import {useState} from "react";
import {useDispatch} from "react-redux";
import {registerUser} from "../../redux/auth/authActions";
import css from "../LoginForm/LoginForm.module.scss";
import cross from "../../images/UI/cross.svg";

const RegistrationForm = ({setVisibleReg, setVisibleLog}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(email, password));
        setVisibleReg(false);
    };

    return (
        <div className={css.input__box}>

            <div className={css.input__box__header}>
                <h1>Sign Up</h1>
                <h2>Create an Account</h2>
                <button
                    style={{background: "transparent", cursor: "default"}}
                    onClick={() => (setVisibleReg(false))}>
                    <img src={cross} alt="" className={css.cross}/>
                </button>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button className={css.submitBtn} type="submit">Get Started</button>

                <div className={css.switch}>
                    Already have an account?
                    <button className={css.switch__already} type="button" onClick={() => setVisibleLog(true)}>
                        Log in here
                    </button>
                </div>

            </form>
        </div>

);
};

export default RegistrationForm;
