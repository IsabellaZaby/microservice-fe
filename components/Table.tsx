import React, { FC } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import styles from "../styles/Delete.module.scss";
import { Button } from "@mui/material";
import { ISensor } from "./interfaces";

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'sensor_id', headerName: 'Sensor ID', width: 130},
    {field: 'timestamp', headerName: 'Timestamp', width: 130},
    {field: 'temperature', headerName: 'Temperature', type: 'number', width: 70},
    {field: 'humidity', headerName: 'Humidity', type: 'number', width: 70},
];

interface ITable {
    sensors: ISensor[];
    setSensors: (sensors: ISensor[]) => void;
    selected: number[];
    setSelected: (num: number[]) => void;
    pageLoad: boolean;
    getUpdateData: () => void;
}

const Table: FC<ITable> = (props) => {
    const {sensors, setSensors, selected, setSelected, pageLoad, getUpdateData} = props;
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
            <div style={{height: 400, width: 600}}>
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
            <div className={styles.buttonWrapper}>
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