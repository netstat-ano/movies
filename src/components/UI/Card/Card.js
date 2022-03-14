import styles from "./Card.module.scss";
const Card = (props) => {
    return (
        <div
            onClick={props.onClick}
            className={`${styles.card} ${
                props.className ? props.className : ""
            }`}
        >
            {props.children}
        </div>
    );
};
export default Card;
