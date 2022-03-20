import { VictoryPie } from "victory-pie";
import styles from "./Overview.module.scss";
const Overview = (props) => {
    return (
        <div className={styles.chart}>
            <VictoryPie
                colorScale={["#28a745", "#6c757d", "#007bff"]}
                width={1000}
                data={props.chartList}
            />
        </div>
    );
};
export default Overview;
