import { VictoryPie } from "victory-pie";
import styles from "./Overview.module.scss";
import Biogram from "../Biogram/Biogram";
import { useEffect, useState } from "react";
const Overview = (props) => {
    const [isChartEmpty, setIsChartEmpty] = useState(false);
    useEffect(() => {
        if (props.chartList !== null) {
            if (
                props.chartList[0].y === 0 &&
                props.chartList[1].y === 0 &&
                props.chartList[2].y === 0
            ) {
                setIsChartEmpty(true);
            } else {
                setIsChartEmpty(false);
            }
            console.log(props.chartList);
        }
    }, [props.chartList]);
    return (
        <div className={styles.content}>
            {isChartEmpty ? (
                <div className={styles.notification}>
                    You must add something to display chart
                </div>
            ) : (
                <VictoryPie
                    colorScale={["#28a745", "#6c757d", "#007bff"]}
                    width={1000}
                    data={props.chartList}
                />
            )}
            <Biogram user={props.user} />
        </div>
    );
};
export default Overview;
