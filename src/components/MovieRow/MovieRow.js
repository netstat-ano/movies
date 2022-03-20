import styles from "./MovieRow.module.scss";
import { get, ref, getDatabase, set } from "firebase/database";
import app from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
const MovieRow = (props) => {
    const onTitleClickHandler = (event) => {
        props.setMovie(props.movieInfo);
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
            <div className={styles.delete}>
                <span onClick={onDeleteMovieHandler}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </span>
            </div>
        </div>
    );
};
export default MovieRow;
