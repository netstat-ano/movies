import { get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import app from "../../firebase";
import MovieRow from "../MovieRow/MovieRow";
const Favourites = (props) => {
    const [favouritesList, setFavouritesList] = useState([]);
    useEffect(() => {
        const database = getDatabase(app);
        get(ref(database, `${props.user.uid}/favourites`)).then((response) => {
            const responseVal = response.val();
            for (const element in responseVal) {
                if (element !== "init") {
                    fetch(
                        `http://www.omdbapi.com/?i=${
                            responseVal[`${element}`]
                        }&page=1&apikey=a6cff7b8`
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            setFavouritesList((prevState) => {
                                return [data, ...prevState];
                            });
                        });
                }
            }
        });
    }, []);
    return (
        <div>
            {favouritesList.map((value) => {
                return (
                    <MovieRow
                        key={value.imdbID}
                        user={props.user}
                        setFavouritesList={setFavouritesList}
                        favouritesList={favouritesList}
                        isFavourite={true}
                        movieInfo={value}
                    />
                );
            })}
        </div>
    );
};
export default Favourites;
