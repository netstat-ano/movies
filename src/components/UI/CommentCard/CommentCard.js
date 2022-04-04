import styles from "./CommentCard.module.scss";
import Card from "../Card/Card";
import { set, ref, update, getDatabase } from "firebase/database";
import defaultAvatar from "../../../assets/img/default-avatar.jpg";
import { ref as sRef, getStorage, getDownloadURL } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import app from "../../../firebase";
const CommentCard = (props) => {
    const [likes, setLikes] = useState(() => {
        if (props.likes > 0) {
            return props.likes;
        }
        return "";
    });

    const [userAvatar, setUserAvatar] = useState(null);

    useEffect(() => {
        const storage = getStorage(app);
        const storageRef = sRef(
            storage,
            `${props.content.commentOwner}/avatar`
        );
        getDownloadURL(storageRef)
            .then((url) => {
                setUserAvatar(url);
            })
            .catch((e) => {
                setUserAvatar(defaultAvatar);
            });
    }, []);

    const [icon, setIcon] = useState(() => {
        if (props.isLiked) {
            return faHeartSolid;
        }
        return faHeart;
    });
    const [isUserCommentOwner, setIsUserCommentOwner] = useState(() => {
        if (props.user.uid === props.content.commentOwner) {
            return true;
        }
        return false;
    });
    const [isLiked, setIsLiked] = useState(props.isLiked);

    const onDeleteCommentHandler = (event) => {
        const database = getDatabase(app);
        set(ref(database, `comments/movies/${props.content.commentID}`), {});
        props.setComment((prevState) => {
            return prevState.filter((comment) => {
                return comment.commentID !== props.content.commentID;
            });
        });
    };

    const onLikeHandler = (event) => {
        if (!isLiked) {
            const database = getDatabase(app);
            const updates = {};
            updates[
                `comments/movies/${props.content.commentID}/${props.content.imdbID}`
            ] = { ...props.content, likes: likes + 1 };
            const likesToSave = {};
            likesToSave[`${props.content.commentID}`] = props.content.commentID;
            updates[`${props.user.uid}/likes`] = { ...likesToSave };
            setLikes((prevState) => Number(prevState) + 1);
            setIcon(faHeartSolid);
            setIsLiked(true);
            props.setComment((prevState) => {
                return prevState.map((comment) => {
                    if (comment.commentID === props.content.commentID) {
                        comment.likes += 1;
                    }
                    return comment;
                });
            });
            update(ref(database), updates);
        } else {
            const database = getDatabase(app);
            const updates = {};
            updates[
                `comments/movies/${props.content.commentID}/${props.content.imdbID}`
            ] = {};
            const likesToSave = {};
            likesToSave[`${props.content.commentID}`] = null;
            updates[`${props.user.uid}/likes`] = { ...likesToSave };
            setLikes((prevState) => Number(prevState) - 1);
            setIsLiked(false);
            setIcon(faHeart);
            props.setComment((prevState) => {
                return prevState.map((comment) => {
                    if (comment.commentID === props.content.commentID) {
                        comment.likes -= 1;
                    }
                    return comment;
                });
            });
            update(ref(database), updates);
        }
    };
    const onMouseOverHeartHandler = (event) => {
        if (!isLiked) {
            setIcon(faHeartSolid);
        } else {
            setIcon(faHeart);
        }
    };
    const onMouseLeaveHeartHandler = (event) => {
        if (!isLiked) {
            setIcon(faHeart);
        } else {
            setIcon(faHeartSolid);
        }
    };
    return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <div className={styles["avatar-container"]}>
                    <img className={styles.avatar} src={userAvatar}></img>
                </div>
                <div className={styles.username}>{props.content.username}</div>
                <div>
                    <div className={styles.text}>{props.content.text}</div>
                    <div className={styles.date}>{props.content.date}</div>
                    <div>
                        <span
                            className={styles.heart}
                            onMouseLeave={onMouseLeaveHeartHandler}
                            onMouseOver={onMouseOverHeartHandler}
                            onClick={onLikeHandler}
                        >
                            {likes > 0 && (
                                <div className={styles["likes-amount"]}>
                                    {likes}
                                </div>
                            )}
                            <FontAwesomeIcon icon={icon} />
                        </span>
                        {isUserCommentOwner && (
                            <span
                                onClick={onDeleteCommentHandler}
                                className={styles.delete}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
};
export default CommentCard;
