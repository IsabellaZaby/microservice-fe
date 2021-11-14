import React, { FC } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import styles from "./styles/Table.module.scss";
import { Button } from "@mui/material";
import { ISensor } from "./interfaces";

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'sensor_id', headerName: 'Sensor ID', minWidth: 130},
    {field: 'timestamp', headerName: 'Timestamp', minWidth: 160},
    {field: 'temperature', headerName: 'Temperature in °C', type: 'number', minWidth: 70},
    {field: 'humidity', headerName: 'Humidity in %', type: 'number', minWidth: 70},
];

interface ITable {
    sensors: ISensor[];
    setSensors: (sensors: ISensor[]) => void;
    selected: number[];
    setSelected: (num: number[]) => void;
    getUpdateData: () => void;
    pageLoad: boolean;
}

const Table: FC<ITable> = (props) => {
    const {sensors, setSensors, selected, setSelected, getUpdateData, pageLoad} = props;
    const selectionChange = (e: any) => {
        setSelected(e);
    };

    const deleteData = () => {
        selected.forEach(async (id) => {
            const rawResponse = await fetch('http://localhost:8080/delete', {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }),
                body: JSON.stringify({id})
            });
            const content = await rawResponse.json();
            setSensors(content);
        });
        setSelected([]);
    };
    return (
        <>
            <div className={styles.container}>
                <div className={styles.inner}>
                    <DataGrid
                        rows={sensors}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        onSelectionModelChange={selectionChange}
                        disableColumnMenu={true}
                        disableSelectionOnClick={true}
                        disableColumnFilter={true}
                        loading={pageLoad}
                    />
                </div>
            </div>
            <div className={styles.bwrapper}>
                <Button
                    variant="contained"
                    disabled={selected?.length > 1 || selected?.length === 0}
                    onClick={getUpdateData}
                    className={styles.button}>
                    Update Entry
                </Button>
                <Button
                    variant="contained"
                    disabled={selected?.length === 0}
                    onClick={deleteData}
                    className={styles.button}>
                    Delete Entry
                </Button>
            </div>
        </>
    );
}

export default Table;
