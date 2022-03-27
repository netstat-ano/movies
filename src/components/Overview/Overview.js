import { VictoryPie } from "victory-pie";
import styles from "./Overview.module.scss";
import Biogram from "../Biogram/Biogram";
const Overview = (props) => {
    return (
        <div className={styles.content}>
            <VictoryPie
                colorScale={["#28a745", "#6c757d", "#007bff"]}
                width={1000}
                data={props.chartList}
            />
            <Biogram user={props.user} />
        </div>
    );
};
export default Overview;
