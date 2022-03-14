import styles from "./MovieCard.module.scss";
import Card from "../Card/Card";
const MovieCard = (props) => {
    return (
        <Card onClick={props.onClick} className={styles.container}>
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
        </Card>
    );
};
export default MovieCard;
