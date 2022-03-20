import styles from "./ProfileSite.module.scss";
import defaultAvatar from "../../assets/img/default-avatar.jpg";
import app from "../../firebase";
import Tabs from "../Tabs/Tabs";
import { get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import MovieList from "../MovieList/MovieList";
import Overview from "../Overview/Overview";
const ProfileSite = (props) => {
    const [chartList, setChartList] = useState(null);
    const [selectedTab, setSelectedTab] = useState("Overview");
    useEffect(() => {
        console.log(chartList);
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
    }, [props.user.uid]);
    const avatar = props.user.photoURL ? (
        <img className={styles.avatar} src={props.user.photoURL}></img>
    ) : (
        <img className={styles.avatar} src={defaultAvatar}></img>
    );
    return (
        <div className={styles["profile-site"]}>
            <div>
                <div className={styles.username}>{props.user.displayName}</div>
                <div className={styles["avatar-container"]}>{avatar}</div>
            </div>
            <Tabs
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                content={["Overview", "Movie list", "Favourites"]}
            />
            <div className={styles.content}>
                {selectedTab === "Overview" && (
                    <Overview chartList={chartList} />
                )}
                {selectedTab === "Movie list" && (
                    <MovieList setMovie={props.setMovie} user={props.user} />
                )}
            </div>
        </div>
    );
};
export default ProfileSite;
