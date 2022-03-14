import styles from "./Profile.module.scss";
import SignInForm from "../SignInForm/SignInForm";
import OverlayPortal from "../UI/Overlay/Overlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const Profile = (props) => {
    const [isFormShowed, setIsFormShowed] = useState(false);
    const onSignInHandler = () => {
        setIsFormShowed(true);
    };
    return (
        <div>
            <div onClick={onSignInHandler} className={styles.profile}>
                <span className={styles.icon}>
                    <FontAwesomeIcon icon={faUser} />
                </span>
                {props.user ? "" : "Sign in"}
            </div>
            {isFormShowed && (
                <OverlayPortal
                    content={[
                        <SignInForm
                            setIsFormShowed={setIsFormShowed}
                            setUser={props.setUser}
                        />,
                    ]}
                />
            )}
        </div>
    );
};
export default Profile;
