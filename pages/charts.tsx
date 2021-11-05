import type { NextPage } from "next";
import React from "react";
import Structure from "../components/Structure";
import SensorChart from "../components/SensorChart";
import { IChartDTO } from "../components/interfaces";
import styles from "../components/styles/Structure.module.scss";

const fetchData = async () => {
    const response = await fetch("http://localhost:8080/readChartData");
    return await response.json();
};

interface ICharts {
    data: IChartDTO[];
}

const Charts: NextPage<ICharts> = ({data}) => {

    return (
        <Structure className={styles.charts}>
            {data?.map((sensor, index) =>
                    <SensorChart key={`${sensor?.sensor_id}-${index}`} data={sensor}/>)}
        </Structure>
    );
};

Charts.getInitialProps = async () => {
    const data = await fetchData();
    return {data};
}

export default Charts;
