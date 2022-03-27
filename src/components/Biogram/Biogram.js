import { set, get, getDatabase, ref } from "firebase/database";
import { useEffect, useState, useRef } from "react";
import app from "../../firebase";
import styles from "./Biogram.module.scss";
import GreenButton from "../UI/GreenButton/GreenButton";
const Biogram = (props) => {
    const [biogramText, setBiogramText] = useState("");
    const [isEdittingMode, setIsEdittingMode] = useState(false);
    const textareaRef = useRef();
    useEffect(() => {
        const database = getDatabase(app);
        get(ref(database, `${props.user.uid}/biogram`)).then((response) => {
            if (response.exists()) {
                setBiogramText(response.val().biogram);
            } else {
                setIsEdittingMode(true);
            }
        });
    }, []);

    const onEditBiogramHandler = (event) => {
        setIsEdittingMode(true);
    };

    const onSetBiogramHandler = (event) => {
        const database = getDatabase(app);
        set(ref(database, `${props.user.uid}/biogram`), {
            biogram: textareaRef.current.value,
        });
        setBiogramText(textareaRef.current.value);
        setIsEdittingMode(false);
    };
    return (
        <div className={styles.container}>
            {isEdittingMode && (
                <>
                    <textarea
                        defaultValue={biogramText}
                        rows="8"
                        ref={textareaRef}
                        className={styles.textarea}
                    ></textarea>
                    <div>
                        <GreenButton
                            button={{ onClick: onSetBiogramHandler }}
                            className={styles.btn}
                        >
                            Set biogram
                        </GreenButton>
                    </div>
                </>
            )}
            {!isEdittingMode && (
                <>
                    <div className={styles["biogram-text"]}>{biogramText}</div>
                    <div
                        className={styles["edit-biogram"]}
                        onClick={onEditBiogramHandler}
                    >
                        Edit biogram
                    </div>
                </>
            )}
        </div>
    );
};
export default Biogram;
