import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import styles from "./Raiting.module.scss";
const Raiting = (props) => {
    const difference = props.rate + 1 - props.rate;
    const resultJSX = [];
    for (let i = 0; i < Math.floor(props.rate); i++) {
        resultJSX.push(<FontAwesomeIcon icon={faStar} />);
    }
    if (props.rate / 1 !== 0 && difference >= 0.5) {
        resultJSX.push(<FontAwesomeIcon icon={faStarHalf} />);
    }
    return <div className={styles.star}>{resultJSX.map((star) => star)}</div>;
};
export default Raiting;
