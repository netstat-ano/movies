import styles from "./Profile.module.scss";
import SignInForm from "../SignInForm/SignInForm";
import OverlayPortal from "../UI/Overlay/Overlay";
import ContextMenu from "../ContextMenu/ContextMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const Profile = (props) => {
    const [isFormShowed, setIsFormShowed] = useState(false);
    const [isContextMenuShowed, setIsContextMenuShowed] = useState(false);

    const onSignInHandler = () => {
        if (!props.user) {
            setIsFormShowed(true);
        } else {
            setIsContextMenuShowed((prevState) => !prevState);
        }
    };
    return (
        <div>
            <div>
                <span onClick={onSignInHandler} className={styles.icon}>
                    <FontAwesomeIcon icon={faUser} />
                    {props.user ? props.user.displayName : "Sign in"}
                </span>
            </div>
            {isContextMenuShowed && (
                <ContextMenu
                    setIsContextMenuShowed={setIsContextMenuShowed}
                    setMovie={props.setMovie}
                    setProfileSite={props.setProfileSite}
                    setUser={props.setUser}
                />
            )}
            {isFormShowed && (
                <OverlayPortal
                    content={[
                        <SignInForm
                            key="signin"
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
