import styles from "./Content.module.scss";
import ProfileSite from "../../ProfileSite/ProfileSite";
const Content = (props) => {
    return (
        <div className={styles.content}>
            {!props.profileSite && (
                <div>
                    <div>Discover random shows:</div>
                    <div>Latest reviews: </div>
                </div>
            )}
            {props.profileSite && <ProfileSite user={props.user} />}
        </div>
    );
};
export default Content;
