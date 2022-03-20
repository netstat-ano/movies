import styles from "./MovieRow.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
const MovieRow = (props) => {
    const onTitleClickHandler = (event) => {
        props.setMovie(props.movieInfo);
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
                <FontAwesomeIcon icon={faTrashCan} />
            </div>
        </div>
    );
};
export default MovieRow;
