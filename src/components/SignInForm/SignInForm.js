import Card from "../UI/Card/Card";
import GreenButton from "../UI/GreenButton/GreenButton";
import styles from "./SignInForm.module.scss";
import app from "../../firebase";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { useRef, useState } from "react";
const SignInForm = (props) => {
    const usernameRef = useRef();
    const emailRef = useRef();
    const retypeEmailRef = useRef();
    const passwordRef = useRef();
    const retypePasswordRef = useRef();

    const [status, setStatus] = useState("signin");
    const [validation, setValidation] = useState({
        email: true,
        retypeEmail: true,
        username: true,
        password: true,
        retypePassword: true,
    });

    const onCloseForm = (event) => {
        props.setIsFormShowed(false);
    };

    const onCreateAccountHandler = (event) => {
        setStatus("signup");
        setValidation({
            email: true,
            retypeEmail: true,
            username: true,
            password: true,
            retypePassword: true,
        });
    };

    const onSignInHandler = (event) => {
        setStatus("signin");
        setValidation({
            email: true,
            retypeEmail: true,
            username: true,
            password: true,
            retypePassword: true,
        });
    };

    const validate = () => {
        let validateResult = { ...validation };
        if (
            emailRef.current.value.includes("@") &&
            emailRef.current.value.includes(".")
        ) {
            validateResult = { ...validateResult, email: true };
        } else {
            validateResult = { ...validateResult, email: false };
        }

        if (retypeEmailRef.current.value === emailRef.current.value) {
            validateResult = { ...validateResult, retypeEmail: true };
        } else {
            validateResult = { ...validateResult, retypeEmail: false };
        }

        if (usernameRef.current.value.trim().length >= 4) {
            validateResult = { ...validateResult, username: true };
        } else {
            validateResult = { ...validateResult, username: false };
        }

        const specialCharacters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        const capitalLetters = new RegExp(`[A-Z]{1,}`);
        if (
            specialCharacters.test(passwordRef.current.value) &&
            capitalLetters.test(passwordRef.current.value) &&
            passwordRef.current.value.trim().length > 6
        ) {
            validateResult = { ...validateResult, password: true };
        } else {
            validateResult = { ...validateResult, password: false };
        }

        if (retypePasswordRef.current.value === passwordRef.current.value) {
            validateResult = { ...validateResult, retypePassword: true };
        } else {
            validateResult = { ...validateResult, retypePassword: false };
        }

        setValidation(validateResult);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const auth = getAuth(app);
        validate();
        if (status === "signin") {
            if (validation.password && validation.email) {
                signInWithEmailAndPassword(
                    auth,
                    emailRef.current.value,
                    passwordRef.current.value
                );
            }
        } else {
            if (
                validation.email &&
                validation.retypeEmail &&
                validation.username &&
                validation.password &&
                validation.retypePassword
            ) {
                createUserWithEmailAndPassword(
                    auth,
                    emailRef.current.value,
                    passwordRef.current.value
                );
            }
        }
    };
    return (
        <Card className={styles.card}>
            <div className={styles.close}>
                <span onClick={onCloseForm} className={styles["close-icon"]}>
                    X
                </span>
            </div>
            <form onSubmit={onSubmitHandler}>
                <div className={styles["email-container"]}>
                    <label htmlFor="email">Email: </label>
                    <input ref={emailRef} id="email"></input>
                    {!validation.email && (
                        <div className={styles.error}>Invalid e-mail</div>
                    )}
                </div>
                {status === "signup" && (
                    <div className={styles["mg-top"]}>
                        <label htmlFor="retype-email">Retype email: </label>
                        <input ref={retypeEmailRef} id="retype-email"></input>
                        {!validation.retypeEmail && (
                            <div className={styles.error}>
                                E-mails must be the same
                            </div>
                        )}
                    </div>
                )}
                {status === "signup" && (
                    <div className={styles["mg-top"]}>
                        <label htmlFor="username">Username: </label>
                        <input ref={usernameRef} id="username"></input>
                        {!validation.username && (
                            <div className={styles.error}>
                                Username must have at least 4 characters
                            </div>
                        )}
                    </div>
                )}
                <div className={styles["mg-top"]}>
                    <label htmlFor="password">Password: </label>
                    <input
                        ref={passwordRef}
                        type="password"
                        id="password"
                    ></input>
                    {!validation.password && (
                        <div className={styles.error}>
                            Password must have at least 6 characters and
                            contains at least 1 capital letter and 1 special
                            character (!@# etc)
                        </div>
                    )}
                </div>
                {status === "signup" && (
                    <div className={styles["mg-top"]}>
                        <label htmlFor="retypePassword">
                            Retype password:{" "}
                        </label>
                        <input
                            ref={retypePasswordRef}
                            type="password"
                            id="retypePassword"
                        ></input>
                        {!validation.retypePassword && (
                            <div className={styles.error}>
                                Passwords must be the same
                            </div>
                        )}
                    </div>
                )}
                <div className={styles["mg-top"]}>
                    {status === "signin" ? (
                        <span
                            className={styles.trigger}
                            onClick={onCreateAccountHandler}
                        >
                            Create an account
                        </span>
                    ) : (
                        <span
                            className={styles.trigger}
                            onClick={onSignInHandler}
                        >
                            Sign in
                        </span>
                    )}
                </div>
                <div className={styles["btn-container"]}>
                    <GreenButton
                        button={{ type: "submit" }}
                        className={styles.btn}
                    >
                        Sign in
                    </GreenButton>
                </div>
            </form>
        </Card>
    );
};
export default SignInForm;
