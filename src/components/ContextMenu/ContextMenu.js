import app from "../../firebase";
import { signOut, getAuth } from "firebase/auth";
import styles from "./ContextMenu.module.scss";
const ContextMenu = (props) => {
    const onShowProfileHandler = (event) => {
        props.setProfileSite(true);
        props.setMovie("");
        props.setIsContextMenuShowed(false);
    };
    const onLogoutHandler = (event) => {
        const data = getAuth(app);
        props.setUser("");
        props.setIsContextMenuShowed(false);
        signOut(data);
    };
    return (
        <div className={styles["context-menu"]}>
            <div
                onClick={onShowProfileHandler}
                className={styles["context-menu-item"]}
            >
                My profile
            </div>
            <div className={styles["context-menu-item"]}>Test</div>
            <div
                onClick={onLogoutHandler}
                className={styles["context-menu-item"]}
            >
                Logout
            </div>
        </div>
    );
};
export default ContextMenu;
