import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Structure from "../components/Structure";
import { Button } from "@mui/material";
import styles from "../styles/Delete.module.scss"
import { IFormData, IFormDataError, ISensor } from "../components/interfaces";
import { formatISO } from "date-fns";
import { LoadingButton } from "@mui/lab";
import { COMMON_CONSTANTS, validateForm } from "../components/utils";
import SensorForm from "../components/SensorForm";
import Table from "../components/Table";

const Delete: NextPage = () => {

    const [pageLoad, setPageLoad] = useState(true);
    const [selected, setSelected] = useState<number[]>([]);
    const [sensors, setSensors] = useState<ISensor[]>([]);
    const [loading, setLoading] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [formData, setFormData] = useState<IFormData>({
        sensorId: '',
        timestamp: formatISO(new Date()),
        temperature: '',
        humidity: ''
    });
    const [errors, setErrors] = useState<IFormDataError>({
        sensorId: false,
        timestamp: false,
        temperature: false,
        humidity: false
    });

    const headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    });

    const fetchData = async () => {
        const response = await fetch("http://localhost:8080/readAll");
        response.json().then((json) => {
            setSensors(json);
            setPageLoad(false);
        });
    };

    const getUpdateData = async () => {
        setIsUpdate(true)
        const response = await fetch(`http://localhost:8080/readSensor?id=${selected[0]}`, {
            method: 'GET',
            headers
        });
        response.json().then((json) => {
            setFormData({
                sensorId: json.sensor_id,
                timestamp: formatISO(new Date(json.timestamp)),
                temperature: json.temperature,
                humidity: json.humidity
            });
        });
    };

    const updateData = () => {
        const formErrors = validateForm(formData, setErrors, errors);
        if (selected?.length === 1 && !formErrors.timestamp && !formErrors.humidity && !formErrors.temperature) {
            setLoading(true);
            selected.forEach(async (id) => {
                await fetch('http://localhost:8080/update', {
                    method: 'PUT',
                    headers,
                    body: JSON.stringify({...formData, id: String(id)})
                }).then(() => fetchData());
            });
            setSelected([]);
            setLoading(false);
            setIsUpdate(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Structure>
            {!isUpdate ? <Table
                    sensors={sensors}
                    setSensors={setSensors}
                    pageLoad={pageLoad}
                    selected={selected}
                    setSelected={setSelected}
                    getUpdateData={getUpdateData}
                /> :
                <>
                    <SensorForm
                        errors={errors}
                        setErrors={setErrors}
                        setFormData={setFormData}
                        formData={formData}
                        type={COMMON_CONSTANTS.UPDATE}
                    />
                    <LoadingButton
                        loading={loading}
                        variant="contained"
                        onClick={updateData}
                        className={styles.button}>
                        Update
                    </LoadingButton>
                    <Button
                        variant="outlined"
                        onClick={() => setIsUpdate(false)}
                        className={styles.button}>
                        Cancel Update
                    </Button>
                </>}

        </Structure>
    );
};

export default Delete;
