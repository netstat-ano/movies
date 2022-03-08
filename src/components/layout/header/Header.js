import styles from "./Header.module.scss";
import Searchbar from "../../Searchbar/Searchbar";
const Header = (props) => {
    return (
        <div className={styles.header}>
            <div>Movies</div>
            <div>
                <Searchbar />
            </div>
        </div>
    );
};
export default Header;
