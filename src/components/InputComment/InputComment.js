import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import app from "../../firebase";
import defaultAvatar from "../../assets/img/default-avatar.jpg";
import styles from "./InputComment.module.scss";
import GreenButton from "../UI/GreenButton/GreenButton";
import { set, update, ref as dRef, getDatabase } from "firebase/database";
const InputComment = (props) => {
    const [userAvatar, setUserAvatar] = useState(null);
    const [textareaValue, setTextareaValue] = useState("");
    const textareaRef = useRef();

    const onTextareaChange = (event) => {
        setTextareaValue(event.target.value);
    };

    useEffect(() => {
        const database = getStorage(app);
        getDownloadURL(ref(database, `${props.user.uid}/avatar`))
            .then((url) => {
                setUserAvatar(url);
            })
            .catch((e) => {
                setUserAvatar(defaultAvatar);
            });
    }, []);

    const createUniqueID = () => {
        return Math.floor(Math.random() * Date.now());
    };

    const onAddCommentHandler = (event) => {
        event.preventDefault();
        if (textareaRef.current.value.trim().length > 0) {
            const database = getDatabase(app);
            const commentID = createUniqueID();
            const date = new Date();
            const currentDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
            const dataToSave = {
                fullDate: date,
                username: props.user.displayName,
                text: textareaRef.current.value,
                imdbID: props.movieInfo.imdbID,
                likes: 0,
                commentID: commentID,
                commentOwner: props.user.uid,
                date: currentDate,
            };
            const updates = {};
            updates[`comments/movies/${commentID}/${props.movieInfo.imdbID}`] =
                dataToSave;
            props.setComment((prevState) => {
                return [dataToSave, ...prevState];
            });
            setTextareaValue("");
            return update(dRef(database), updates);
        }
    };
    return (
        <div className={styles.container}>
            <form onSubmit={onAddCommentHandler}>
                <div>
                    <img className={styles.avatar} src={userAvatar}></img>
                    <textarea
                        onChange={onTextareaChange}
                        value={textareaValue}
                        ref={textareaRef}
                        placeholder="Write what you are thinking about this movie"
                        className={styles.textarea}
                        rows="5"
                    ></textarea>
                </div>
                <div className={styles["add-btn"]}>
                    <GreenButton>Add</GreenButton>
                </div>
            </form>
        </div>
    );
};
export default InputComment;
