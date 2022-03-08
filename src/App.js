import Header from "./components/layout/header/Header";
import styles from "./App.module.scss";
import Content from "./components/layout/content/Content";
function App() {
    return (
        <div className={styles.app}>
            <Header />
            <Content />
        </div>
    );
}

export default App;
