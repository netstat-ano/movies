import Header from "./components/layout/Header/Header";
import styles from "./App.module.scss";
import Content from "./components/layout/content/Content";
import Searchbar from "./components/Searchbar/Searchbar";
import MovieSite from "./components/UI/MovieSite/MovieSite";
import Profile from "./components/Profile/Profile";
import { useState } from "react";
function App() {
    const [isSearchingActive, setIsSearchingActive] = useState(false);
    const [movie, setMovie] = useState("");
    const [user, setUser] = useState(null);
    return (
        <div className={styles.app}>
            <div className={`${!isSearchingActive && styles.header}`}>
                {!isSearchingActive && <Header setMovie={setMovie} />}
                <Searchbar
                    setMovie={setMovie}
                    isSearchingActive={isSearchingActive}
                    setIsSearchingActive={setIsSearchingActive}
                />
                <Profile user={user} />
            </div>
            {movie && !isSearchingActive && (
                <MovieSite user={user} setMovie={setMovie} movieInfo={movie} />
            )}
            {!isSearchingActive && !movie && <Content />}
        </div>
    );
}

export default App;
