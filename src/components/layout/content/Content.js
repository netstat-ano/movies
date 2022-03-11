import styles from "./Content.module.scss";
const Content = (props) => {
    return (
        <div className={styles.content}>
            <div>Discover random shows:</div>
            <div>Latest reviews: </div>
        </div>
    );
};
export default Content;
