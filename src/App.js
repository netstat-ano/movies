import Header from "./components/layout/header/Header";
import styles from "./App.module.scss";
import Content from "./components/layout/content/Content";
import Searchbar from "./components/Searchbar/Searchbar";
import { useState } from "react";
function App() {
    const [isSearchingActive, setIsSearchingActive] = useState(false);
    return (
        <div className={styles.app}>
            <div className={`${!isSearchingActive && styles.header}`}>
                {!isSearchingActive && <Header />}
                <Searchbar
                    isSearchingActive={isSearchingActive}
                    setIsSearchingActive={setIsSearchingActive}
                />
            </div>
            {!isSearchingActive && <Content />}
        </div>
    );
}

export default App;
