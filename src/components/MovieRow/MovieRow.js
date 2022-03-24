import styles from "./MovieRow.module.scss";
import { ref, getDatabase, set, update } from "firebase/database";
import app from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
const MovieRow = (props) => {
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [isFavourite, setIsFavourite] = useState(props.isFavourite);
    const onStarClickHandler = (event) => {
        if (props.isFavourite === false) {
            setIsFavourite(true);
            const database = getDatabase(app);
            const movieToFavourites = {};
            movieToFavourites[
                `/${props.user.uid}/favourites/${props.movieInfo.Title}`
            ] = props.movieInfo.imdbID;
            update(ref(database), movieToFavourites);
        } else {
            setIsFavourite(false);
            const database = getDatabase(app);
            if (props.favouritesList) {
                props.setFavouritesList((prevState) => {
                    return prevState.filter((value) => {
                        return value["Title"] !== props.movieInfo.Title;
                    });
                });
            }
            set(
                ref(
                    database,
                    `${props.user.uid}/favourites/${props.movieInfo.Title}`
                ),
                {}
            );
        }
    };

    const onTitleClickHandler = (event) => {
        props.setMovie(props.movieInfo);
    };
    const onMouseHoverHandler = (event) => {
        setIsMouseOver(true);
    };
    const onMouseLeaveHandler = (event) => {
        setIsMouseOver(false);
    };
    const onDeleteMovieHandler = (event) => {
        const database = getDatabase(app);
        set(
            ref(
                database,
                `${props.user.uid}/${props.path}/${props.movieInfo.Title}`
            ),
            {}
        );
        props.setState((prevState) => {
            return prevState.filter(
                (value) => value.Title !== props.movieInfo.Title
            );
        });
        let type = null;
        if (props.path === "Set_as_watched") {
            type = "Completed";
        } else if (props.path === "Set_as_planned") {
            type = "Planned";
        } else if (props.path === "Set_as_currently_watching") {
            type = "Currently watching";
        }

        props.setChartList((prevState) => {
            return prevState.filter((value) => {
                if (value.x[0] === type[0] && value.x[1] === type[1]) {
                    value.y -= 1;
                }
                return value;
            });
        });
    };

    return (
        <div className={styles["movie-row"]}>
            <div>
                <span className={styles.title} onClick={onTitleClickHandler}>
                    {props.movieInfo.Title}
                </span>
            </div>
            <div>{props.movieInfo.Released}</div>
            <div>{props.movieInfo.imdbRating}</div>
            <div>
                <span className={styles.delete} onClick={onDeleteMovieHandler}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </span>
            </div>
            <div>
                <span
                    onClick={onStarClickHandler}
                    className={`${isFavourite ? styles.star : styles.gold}`}
                    onMouseLeave={onMouseLeaveHandler}
                    onMouseOver={onMouseHoverHandler}
                >
                    <FontAwesomeIcon icon={faStarSolid} />
                </span>
            </div>
        </div>
    );
};
export default MovieRow;
