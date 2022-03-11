import styles from "./Header.module.scss";
const Header = (props) => {
    const redirectToHome = (event) => {
        props.setMovie("");
    };
    return (
        <div className={styles.header}>
            <div>
                <span className={styles.title} onClick={redirectToHome}>
                    Movies
                </span>
            </div>
        </div>
    );
};
export default Header;
