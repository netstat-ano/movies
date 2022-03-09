import styles from "./MovieCard.module.scss";
const MovieCard = (props) => {
    return (
        <div onClick={props.onClick} className={styles.container}>
            <div>
                <img
                    className={styles.poster}
                    alt="movie poster"
                    src={props.Poster}
                ></img>
            </div>
            <div className={styles.title}>
                {props.Title} <p>{props.plot}</p>
            </div>
            <div className={styles.year}>{props.Year}</div>
        </div>
    );
};
export default MovieCard;
