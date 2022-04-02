import styles from "./ProfileSite.module.scss";
import defaultAvatar from "../../assets/img/default-avatar.jpg";
import app from "../../firebase";
import Tabs from "../Tabs/Tabs";
import { get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import MovieList from "../MovieList/MovieList";
import Overview from "../Overview/Overview";
import Favourites from "../Favourites/Favourites";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import {
    getStorage,
    uploadBytes,
    ref as sRef,
    getDownloadURL,
} from "firebase/storage";
const ProfileSite = (props) => {
    const [chartList, setChartList] = useState(null);
    const [selectedTab, setSelectedTab] = useState("Overview");
    const [userAvatar, setUserAvatar] = useState(null);
    const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
    const fetchAvatar = (event) => {
        setIsUpdatingAvatar(true);
        const storage = getStorage(app);
        const storageRef = sRef(storage, `${props.user.uid}/avatar`);
        getDownloadURL(storageRef)
            .then((url) => {
                setIsUpdatingAvatar(false);
                setUserAvatar(url);
            })
            .catch((e) => {
                setIsUpdatingAvatar(false);
                setUserAvatar(defaultAvatar);
            });
    };
    const onChangeAvatarHandler = (event) => {
        setIsUpdatingAvatar(true);
        const storage = getStorage(app);
        const storageRef = sRef(storage, `${props.user.uid}/avatar`);
        uploadBytes(storageRef, event.target.files[0]).then(() => {
            fetchAvatar();
            setIsUpdatingAvatar(false);
        });
    };

    useEffect(() => {
        const database = getDatabase(app);
        get(ref(database, `${props.user.uid}`)).then((response) => {
            const value = response.val();
            setChartList([
                {
                    x: `Completed (${
                        Object.keys(value["Set_as_watched"]).length - 1
                    })`,
                    y: Object.keys(value["Set_as_watched"]).length - 1,
                },
                {
                    x: `Plan to watch (${
                        Object.keys(value["Set_as_planned"]).length - 1
                    })`,
                    y: Object.keys(value["Set_as_planned"]).length - 1,
                },
                {
                    x: `Currently watching(${
                        Object.keys(value["Set_as_currently_watching"]).length -
                        1
                    })`,
                    y:
                        Object.keys(value["Set_as_currently_watching"]).length -
                        1,
                },
            ]);
        });
        fetchAvatar();
    }, [props.user.uid]);

    return (
        <div className={styles["profile-site"]}>
            <div className={styles["profile-header"]}>
                <div className={styles.username}>{props.user.displayName}</div>
                <div className={styles["container"]}>
                    <div className={styles["avatar-container"]}>
                        {isUpdatingAvatar && (
                            <div
                                className={`${styles.loading} ${styles["img-overlay"]}`}
                            >
                                <FontAwesomeIcon
                                    className="fa-spin"
                                    icon={faSpinner}
                                />
                            </div>
                        )}
                        <img className={styles.avatar} src={userAvatar}></img>
                        <div className={styles["img-overlay"]}>
                            <div className={styles["change-avatar"]}>
                                <input
                                    onChange={onChangeAvatarHandler}
                                    type="file"
                                    id="file"
                                    accept="image/png, image/jpeg"
                                    style={{ display: "none" }}
                                ></input>
                                <label htmlFor="file">
                                    <span
                                        className={styles["change-avatar-btn"]}
                                    >
                                        Change avatar
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Tabs
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                content={["Overview", "Movie list", "Favourites"]}
            />
            <div className={styles.content}>
                {selectedTab === "Overview" && (
                    <Overview user={props.user} chartList={chartList} />
                )}
                {selectedTab === "Movie list" && (
                    <MovieList
                        setChartList={setChartList}
                        setMovie={props.setMovie}
                        user={props.user}
                    />
                )}
                {selectedTab === "Favourites" && (
                    <Favourites user={props.user} />
                )}
            </div>
        </div>
    );
};
export default ProfileSite;
