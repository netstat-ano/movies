import styles from "./GreenButton.module.scss";
const GreenButton = (props) => {
    return (
        <button
            {...props.button}
            className={`${styles.button} ${
                props.className ? props.className : ""
            }`}
        >
            {props.children}
        </button>
    );
};
export default GreenButton;
