import styles from "./MovieSite.module.scss";
import Raiting from "../Raiting/Raiting";
import GreenButton from "../GreenButton/GreenButton";
import { getDatabase, update, ref, get, set } from "firebase/database";
import app from "../../../firebase";
import { useState } from "react";
const MovieSite = (props) => {
    console.log(props.movieInfo);
    const [isButtonExpanded, setIsButtonExpanded] = useState(false);
    const onAddToListHandler = (event) => {
        setIsButtonExpanded((prevState) => !prevState);
    };
    const onSetMovieHandler = (event) => {
        const database = getDatabase(app);
        const path = event.target.textContent.replaceAll(" ", "_");
        const movieToSave = {};
        get(ref(database, `${props.user.uid}`)).then((response) => {
            const responseValue = response.val();
            for (const response in responseValue) {
                if (response !== path) {
                    for (const element in responseValue[`${response}`]) {
                        if (element === props.movieInfo.Title) {
                            set(
                                ref(
                                    database,
                                    `${props.user.uid}/${response}/${element}`
                                ),
                                {}
                            );
                        }
                    }
                }
            }
        });
        movieToSave[`${props.user.uid}/${path}/${props.movieInfo.Title}`] =
            props.movieInfo.imdbID;
        update(ref(database), movieToSave);
    };
    return (
        <div className={styles.container}>
            <div>
                <img
                    className={styles.poster}
                    alt="movie poster"
                    src={props.movieInfo.Poster}
                ></img>
                <div className={styles.rating}>
                    <Raiting rate={Number(props.movieInfo.imdbRating)} />
                    <div className={styles["rating-number"]}>
                        {props.movieInfo.imdbRating}
                    </div>
                </div>
            </div>
            <div className={styles["container-info"]}>
                <div>
                    <p className={styles.title}>{props.movieInfo.Title}</p>
                    <p className={styles.plot}>{props.movieInfo.Plot}</p>
                </div>
                <div className={styles["side-info"]}>
                    <div>Released: {props.movieInfo.Released}</div>
                    <div>Rated: {props.movieInfo.Rated}</div>
                    <div>Genre: {props.movieInfo.Genre}</div>
                    <div>Country: {props.movieInfo.Country}</div>
                    <div>Director: {props.movieInfo.Director}</div>
                </div>
                {props.user ? (
                    <div className={styles["add-to-list"]}>
                        <GreenButton
                            className={styles["add-to-list-btn"]}
                            button={{ onClick: onAddToListHandler }}
                        >
                            Add to list +
                        </GreenButton>
                        {isButtonExpanded && (
                            <>
                                <GreenButton
                                    button={{ onClick: onSetMovieHandler }}
                                    className={styles["setting-btn"]}
                                >
                                    Set as watched
                                </GreenButton>
                                <GreenButton
                                    button={{ onClick: onSetMovieHandler }}
                                    className={styles["setting-btn"]}
                                >
                                    Set as planned
                                </GreenButton>
                                <GreenButton
                                    button={{ onClick: onSetMovieHandler }}
                                    className={styles["setting-btn"]}
                                >
                                    Set as currently watching
                                </GreenButton>
                            </>
                        )}
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};
export default MovieSite;
