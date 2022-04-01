import { get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import app from "../../firebase";
import MovieRow from "../MovieRow/MovieRow";
import styles from "./Favourites.module.scss";
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
                            responseVal[`${element}`].imdbID
                        }&page=1&apikey=a6cff7b8`
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            data.path = responseVal[`${element}`].path;
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
            {favouritesList.length > 0 ? (
                favouritesList.map((value) => {
                    return (
                        <MovieRow
                            path={value.path}
                            setState={setFavouritesList}
                            key={value.imdbID}
                            user={props.user}
                            setFavouritesList={setFavouritesList}
                            favouritesList={favouritesList}
                            isFavourite={true}
                            movieInfo={value}
                        />
                    );
                })
            ) : (
                <div className={styles.notification}>
                    You can add show to favourites by clicking star in movies
                    tab
                </div>
            )}
        </div>
    );
};
export default Favourites;
