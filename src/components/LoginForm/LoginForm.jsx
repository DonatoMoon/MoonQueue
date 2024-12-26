// src/components/LoginForm/LoginForm.jsx
import {useState} from "react";
import {useDispatch} from "react-redux";
import {loginUser} from "../../redux/auth/authActions";
import css from "./LoginForm.module.scss"
import cross from './../../images/UI/cross.svg';

const LoginForm = ({setVisibleLog, setVisibleReg}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(email, password));
        setVisibleLog(false);
    };

    return (
        <div className={css.input__box}>

            <div className={css.input__box__header}>
                <h1>Log In</h1>
                <h2>welcome back</h2>
                <button
                    style={{background: "transparent", cursor: "default"}}
                    onClick={() => (setVisibleLog(false))}>
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
                <button className={css.submitBtn} type="submit">continue</button>

                <div className={css.switch}>
                    New User?
                    <button className={css.switch__already} type="button" onClick={() => setVisibleReg(true)}>
                        Sing up here
                    </button>
                </div>

            </form>
        </div>

    );
};

export default LoginForm;
