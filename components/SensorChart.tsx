import React, { FC } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { IChartDTO } from "./interfaces";

interface ISensorChart {
    data: IChartDTO;
}

const SensorChart: FC<ISensorChart> = ({data}) => {

    return (
        <>
            <h3>Sensor-ID: {data.sensor_id}</h3>
            <ResponsiveContainer minHeight={300} minWidth={300}>
                <LineChart
                    width={500}
                    height={300}
                    data={data?.entries}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="timestamp"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="humidity" stroke="#30694b" activeDot={{r: 8}}/>
                </LineChart>
            </ResponsiveContainer>
        </>
    );
};

export default SensorChart;