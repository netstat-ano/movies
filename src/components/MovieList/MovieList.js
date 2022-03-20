import { useEffect, useState } from "react";
import { get, ref, getDatabase } from "firebase/database";
import app from "../../firebase";
import MovieRow from "../MovieRow/MovieRow";
import styles from "./MovieList.module.scss";
const MovieList = (props) => {
    const [movies, setMovies] = useState(null);
    const [currentlyWatching, setCurrentlyWatching] = useState([]);
    const [plannedWatching, setPlannedWatching] = useState([]);
    const [completed, setCompleted] = useState([]);
    useEffect(() => {
        const database = getDatabase(app);
        get(ref(database, `${props.user.uid}`)).then((response) => {
            setMovies(response.val());
        });
    }, []);

    useEffect(() => {
        console.log(movies);
        if (movies !== null) {
            for (const element in movies["Set_as_currently_watching"]) {
                if (element !== "init") {
                    fetch(
                        `http://www.omdbapi.com/?i=${
                            movies["Set_as_currently_watching"][`${element}`]
                        }&page=1&apikey=a6cff7b8`
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            setCurrentlyWatching((prevState) => {
                                return [data, ...prevState];
                            });
                        });
                }
            }
            for (const element in movies["Set_as_planned"]) {
                if (element !== "init") {
                    fetch(
                        `http://www.omdbapi.com/?i=${
                            movies["Set_as_planned"][`${element}`]
                        }&page=1&apikey=a6cff7b8`
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            setPlannedWatching((prevState) => {
                                return [data, ...prevState];
                            });
                        });
                }
            }
            for (const element in movies["Set_as_watched"]) {
                if (element !== "init") {
                    fetch(
                        `http://www.omdbapi.com/?i=${
                            movies["Set_as_watched"][`${element}`]
                        }&page=1&apikey=a6cff7b8`
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            setCompleted((prevState) => {
                                return [data, ...prevState];
                            });
                        });
                }
            }
        }
    }, [movies]);

    return (
        <div>
            <div className={`${styles.header} ${styles.current}`}>
                Currently watching:{" "}
            </div>
            {currentlyWatching.map((element) => {
                return (
                    <MovieRow setMovie={props.setMovie} movieInfo={element} />
                );
            })}
            <div className={`${styles.header} ${styles.planned}`}>Planned:</div>
            {plannedWatching.map((element) => {
                return (
                    <MovieRow setMovie={props.setMovie} movieInfo={element} />
                );
            })}
            <div className={`${styles.header} ${styles.completed}`}>
                Completed:
            </div>
            {completed.map((element) => {
                return (
                    <MovieRow setMovie={props.setMovie} movieInfo={element} />
                );
            })}
        </div>
    );
};
export default MovieList;
