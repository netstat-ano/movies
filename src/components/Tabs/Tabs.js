import styles from "./Tabs.module.scss";
const Tabs = (props) => {
    const onClickHandler = (event) => {
        props.setSelectedTab(event.target.textContent);
    };
    return (
        <div className={styles.tabs}>
            {props.content.map((el) => (
                <div
                    onClick={onClickHandler}
                    className={`${
                        props.selectedTab === el ? styles.selected : ""
                    } ${styles["tab-element"]}`}
                >
                    {el}
                </div>
            ))}
        </div>
    );
};
export default Tabs;
