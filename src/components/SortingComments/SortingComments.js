import { useState } from "react";
import styles from "./SortingComments.module.scss";
const SortingComments = (props) => {
    const [isSortMenuExpanded, setIsSortMenuExpanded] = useState(false);
    const [sortType, setSortType] = useState("newest");

    const onSortingClickHandler = (event) => {
        setIsSortMenuExpanded((prevState) => !prevState);
    };

    const sortOldest = (setComment) => {
        setComment((prevState) => {
            const sortedArray = prevState.sort(function (a, b) {
                return new Date(a.fullDate) - new Date(b.fullDate);
            });
            return [...sortedArray];
        });
    };

    const sortNewest = (setComment) => {
        setComment((prevState) => {
            const sortedArray = prevState.sort(function (a, b) {
                return new Date(b.fullDate) - new Date(a.fullDate);
            });
            return [...sortedArray];
        });
    };

    const sortAscendingly = (setComment) => {
        setComment((prevState) => {
            const sortedArray = prevState.sort(function (a, b) {
                return b.likes - a.likes;
            });
            return [...sortedArray];
        });
    };

    const sortDescendingly = (setComment) => {
        setComment((prevState) => {
            const sortedArray = prevState.sort(function (a, b) {
                return a.likes - b.likes;
            });
            return [...sortedArray];
        });
    };

    const onItemsClickHandler = (event) => {
        console.log(props.comment);
        setIsSortMenuExpanded(false);
        if (event.target.textContent === "Date (from the oldest)") {
            if (sortType !== "oldest") {
                setSortType("oldest");
                sortOldest(props.setComment);
            }
        } else if (event.target.textContent === "Date (from the newest)") {
            if (sortType !== "newest") {
                setSortType("newest");
                sortNewest(props.setComment);
            }
        } else if (event.target.textContent === "Likes (ascendingly)") {
            if (sortType !== "ascendingly") {
                setSortType("ascendingly");
                sortAscendingly(props.setComment);
            }
        } else if (event.target.textContent === "Likes (descending)") {
            setSortType("descendingly");
            sortDescendingly(props.setComment);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.trigger} onClick={onSortingClickHandler}>
                Sort by: {sortType}
            </div>
            {isSortMenuExpanded && (
                <div onClick={onItemsClickHandler} className={styles.items}>
                    <div className={styles.item}>Date (from the oldest)</div>
                    <div className={styles.item}>Date (from the newest)</div>
                    <div className={styles.item}>Likes (ascendingly)</div>
                    <div className={styles.item}>Likes (descending)</div>
                </div>
            )}
        </div>
    );
};
export default SortingComments;
