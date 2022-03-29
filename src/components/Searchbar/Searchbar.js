import { useEffect, useState } from "react";
import OverlayPortal from "../UI/Overlay/Overlay";
import MovieCard from "../UI/MovieCard/MovieCard";
import styles from "./Searchbar.module.scss";
const Searchbar = (props) => {
    const [searchedShow, setSearchedShow] = useState("");
    const [searchingResults, setSearchingResults] = useState([]);
    const [overlayContent, setOverlayContent] = useState([]);
    const onInputChangeHandler = (event) => {
        setSearchedShow(event.target.value);
        fetch(
            `http://www.omdbapi.com/?s=${event.target.value}&page=1&apikey=a6cff7b8`
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.Search) {
                    setSearchingResults([...data.Search]);
                }
            });
    };

    const onMovieCardClickHandler = (event, movieInfo) => {
        setSearchedShow("");
        props.setIsSearchingActive(false);
        props.setMovie(movieInfo);
    };

    const onFocusHandler = () => {
        props.setIsSearchingActive(true);
    };

    const onBlurHandler = () => {
        props.setIsSearchingActive(false);
    };

    //pobiera dokladne dane o kazdym filmie i wstawia je do komponentu MovieCard
    useEffect(() => {
        setOverlayContent([]);
        searchingResults.forEach((element) => {
            fetch(
                `http://www.omdbapi.com/?i=${element.imdbID}&page=1&apikey=a6cff7b8`
            )
                .then((response) => response.json())
                .then((data) => {
                    setOverlayContent((prevState) => {
                        return [
                            ...prevState,
                            <MovieCard
                                onClick={(event) => {
                                    onMovieCardClickHandler(event, data);
                                }}
                                plot={data.Plot}
                                key={element.imdbID}
                                {...element}
                            />,
                        ];
                    });
                });
        });
    }, [searchingResults]);
    return (
        <div className={`${props.isSearchingActive && styles.searchbar}`}>
            {props.isSearchingActive && (
                <div className={styles.close}>
                    <span
                        className={styles["close-icon"]}
                        onClick={onBlurHandler}
                    >
                        X
                    </span>
                </div>
            )}
            <input
                placeholder="Search"
                className={`${styles.input} ${
                    props.isSearchingActive
                        ? styles["input-active"]
                        : styles["input-inactive"]
                }`}
                onFocus={onFocusHandler}
                onChange={onInputChangeHandler}
                type="text"
                value={searchedShow}
            ></input>
            {searchedShow && props.isSearchingActive ? (
                <OverlayPortal content={overlayContent} />
            ) : (
                ""
            )}
        </div>
    );
};
export default Searchbar;
