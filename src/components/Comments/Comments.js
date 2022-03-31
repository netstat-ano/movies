import { get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import app from "../../firebase";
import InputComment from "../InputComment/InputComment";
import CommentCard from "../UI/CommentCard/CommentCard";
import SortingComments from "../SortingComments/SortingComments";
const Comments = (props) => {
    const [comment, setComment] = useState([]);
    useEffect(() => {
        const database = getDatabase(app);
        get(ref(database, `comments/movies`)).then((response) => {
            if (response.exists()) {
                const responseVal = response.val();
                const responseComments = [];
                for (const id in responseVal) {
                    if (responseVal[id][`${props.movieInfo.imdbID}`]) {
                        responseComments.push({
                            ...responseVal[id][`${props.movieInfo.imdbID}`],
                        });
                    }
                }
                get(ref(database, `${props.user.uid}/likes`))
                    .then((response) => {
                        if (response.exists()) {
                            const responseVal = response.val();
                            for (const element in responseVal) {
                                for (const commentIndex in responseComments) {
                                    if (
                                        String(
                                            responseComments[commentIndex]
                                                .commentID
                                        ) === element
                                    ) {
                                        responseComments[commentIndex] = {
                                            ...responseComments[commentIndex],
                                            isLiked: true,
                                        };
                                    }
                                }
                            }
                        }
                    })
                    .then(() => {
                        setComment((prevState) => {
                            return [...responseComments];
                        });
                    });
            } else {
                return;
            }
        });
    }, []);
    return (
        <>
            <InputComment
                movieInfo={props.movieInfo}
                setComment={setComment}
                user={props.user}
            />
            <SortingComments comment={comment} setComment={setComment} />
            {comment.map((data) => {
                return (
                    <CommentCard
                        setComment={setComment}
                        user={props.user}
                        key={data.commentID}
                        isLiked={data.isLiked}
                        content={data}
                        likes={data.likes}
                    />
                );
            })}
        </>
    );
};
export default Comments;
