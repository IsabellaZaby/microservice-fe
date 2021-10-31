import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Structure from "../components/Structure";
import SensorChart from "../components/SensorChart";
import { IChartDTO } from "../components/interfaces";
import { CircularProgress } from "@mui/material";
import styles from "../components/styles/Structure.module.scss";


const Charts: NextPage = () => {

    const [sensors, setSensors] = useState<IChartDTO[]>([]);
    const [pageLoad, setPageLoad] = useState(true);
    const fetchData = async () => {
        const response = await fetch("http://localhost:8080/readChartData");
        response.json().then((json) => {
            setSensors(json);
        });
        setPageLoad(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Structure className={!pageLoad ? styles.charts : ''}>
            {pageLoad ? <CircularProgress style={{margin: '0 auto'}}/> :
                sensors?.map((sensor, index) =>
                    <SensorChart key={`${sensor?.sensor_id}-${index}`} data={sensor}/>)
            }
        </Structure>
    );
};

export default Charts;
