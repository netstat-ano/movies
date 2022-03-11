import styles from "./MovieSite.module.scss";
import Raiting from "../Raiting/Raiting";
import GreenButton from "../GreenButton/GreenButton";
const MovieSite = (props) => {
    console.log(props.movieInfo);
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
                        <GreenButton>Add to list</GreenButton>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};
export default MovieSite;
