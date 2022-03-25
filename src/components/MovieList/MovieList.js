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
        const database = getDatabase(app);
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
                            get(
                                ref(database, `${props.user.uid}/favourites`)
                            ).then((response) => {
                                const responseVal = response.val();
                                let isFavourite = false;
                                for (const element in responseVal) {
                                    if (element === data.Title) {
                                        isFavourite = true;
                                    }
                                }
                                data.isFavourite = isFavourite;
                                setCurrentlyWatching((prevState) => {
                                    return [data, ...prevState];
                                });
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
                            get(
                                ref(database, `${props.user.uid}/favourites`)
                            ).then((response) => {
                                const responseVal = response.val();
                                let isFavourite = false;
                                for (const element in responseVal) {
                                    if (element === data.Title) {
                                        isFavourite = true;
                                    }
                                }
                                data.isFavourite = isFavourite;
                                setPlannedWatching((prevState) => {
                                    return [data, ...prevState];
                                });
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
                            get(
                                ref(database, `${props.user.uid}/favourites`)
                            ).then((response) => {
                                const responseVal = response.val();
                                let isFavourite = false;
                                for (const element in responseVal) {
                                    if (element === data.Title) {
                                        isFavourite = true;
                                    }
                                }
                                data.isFavourite = isFavourite;
                                setCompleted((prevState) => {
                                    return [data, ...prevState];
                                });
                            });
                        });
                }
            }
        }
    }, [movies]);

    return (
        <div>
            <div className={styles.heading}>
                <div>Title</div>
                <div>Release date</div>
                <div>Rating</div>
            </div>
            <div className={`${styles.header} ${styles.current}`}>
                Currently watching:{" "}
            </div>
            {currentlyWatching.map((element) => {
                return (
                    <MovieRow
                        key={element.imdbID}
                        isFavourite={element.isFavourite}
                        setChartList={props.setChartList}
                        state={currentlyWatching}
                        setState={setCurrentlyWatching}
                        user={props.user}
                        path={"Set_as_currently_watching"}
                        setMovie={props.setMovie}
                        movieInfo={element}
                    />
                );
            })}
            <div className={`${styles.header} ${styles.planned}`}>Planned:</div>
            {plannedWatching.map((element) => {
                return (
                    <MovieRow
                        key={element.imdbID}
                        isFavourite={element.isFavourite}
                        setChartList={props.setChartList}
                        state={plannedWatching}
                        setState={setPlannedWatching}
                        user={props.user}
                        path={"Set_as_planned"}
                        setMovie={props.setMovie}
                        movieInfo={element}
                    />
                );
            })}
            <div className={`${styles.header} ${styles.completed}`}>
                Completed:
            </div>
            {completed.map((element) => {
                return (
                    <MovieRow
                        key={element.imdbID}
                        isFavourite={element.isFavourite}
                        setChartList={props.setChartList}
                        state={completed}
                        setState={setCompleted}
                        user={props.user}
                        path={"Set_as_watched"}
                        setMovie={props.setMovie}
                        movieInfo={element}
                    />
                );
            })}
        </div>
    );
};
export default MovieList;
