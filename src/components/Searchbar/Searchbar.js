import { useEffect, useState } from "react";
import OverlayPortal from "../UI/Overlay/Overlay";
import MovieCard from "../UI/MovieCard/MovieCard";
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
                                plot={data.Plot}
                                key={element.Title}
                                {...element}
                            />,
                        ];
                    });
                });
        });
    }, [searchingResults]);
    return (
        <>
            <input onChange={onInputChangeHandler} type="text"></input>
            {searchedShow ? <OverlayPortal content={overlayContent} /> : ""}
        </>
    );
};
export default Searchbar;
