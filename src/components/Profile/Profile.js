import styles from "./Profile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
const Profile = (props) => {
    return (
        <div className={styles.profile}>
            <span className={styles.icon}>
                <FontAwesomeIcon icon={faUser} />
            </span>
            {props.user ? "" : "Sign in"}
        </div>
    );
};
export default Profile;
