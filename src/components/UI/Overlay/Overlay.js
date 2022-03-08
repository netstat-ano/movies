import ReactDOM from "react-dom";
import styles from "./Overlay.module.scss";
const Overlay = (props) => {
    return (
        <div className={styles.overlay}>
            {props.content.map((element) => element)}
        </div>
    );
};

const OverlayPortal = (props) => {
    return ReactDOM.createPortal(
        <Overlay {...props} />,
        document.getElementById("overlay-root")
    );
};
export default OverlayPortal;
