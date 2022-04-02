import styles from "./Content.module.scss";
import ProfileSite from "../../ProfileSite/ProfileSite";

const Content = (props) => {
    return (
        <div className={styles.content}>
            {!props.profileSite && (
                <div className={styles.main}>
                    <div>
                        On this website you can search any movie by searchbar
                        and add film to your lists or to your favourites.
                    </div>
                </div>
            )}
            {props.profileSite && (
                <ProfileSite setMovie={props.setMovie} user={props.user} />
            )}
        </div>
    );
};
export default Content;
