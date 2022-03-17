import Header from "./components/layout/Header/Header";
import styles from "./App.module.scss";
import Content from "./components/layout/Content/Content";
import Searchbar from "./components/Searchbar/Searchbar";
import MovieSite from "./components/UI/MovieSite/MovieSite";
import Profile from "./components/Profile/Profile";
import { useState } from "react";
function App() {
    const [isSearchingActive, setIsSearchingActive] = useState(false);
    const [movie, setMovie] = useState("");
    const [user, setUser] = useState(null);
    const [profileSite, setProfileSite] = useState(null);
    return (
        <div className={styles.app}>
            <div className={`${!isSearchingActive && styles.header}`}>
                {!isSearchingActive && (
                    <Header
                        setProfileSite={setProfileSite}
                        setMovie={setMovie}
                    />
                )}
                <Searchbar
                    setMovie={setMovie}
                    isSearchingActive={isSearchingActive}
                    setIsSearchingActive={setIsSearchingActive}
                />
                {!isSearchingActive && (
                    <Profile
                        setProfileSite={setProfileSite}
                        setUser={setUser}
                        user={user}
                    />
                )}
            </div>
            {movie && !isSearchingActive && (
                <MovieSite user={user} setMovie={setMovie} movieInfo={movie} />
            )}
            {!isSearchingActive && !movie && (
                <Content user={user} profileSite={profileSite} />
            )}
        </div>
    );
}

export default App;
