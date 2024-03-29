import type { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import Structure from "../components/Structure";
import { Button } from "@mui/material";
import styles from "../styles/Delete.module.scss"
import { IFormData, IFormDataError, ISensor } from "../components/interfaces";
import { formatISO } from "date-fns";
import { LoadingButton } from "@mui/lab";
import { COMMON_CONSTANTS, validateForm } from "../components/utils";
import SensorForm from "../components/SensorForm";
import Table from "../components/Table";
import { Context } from "./_app";

const Delete: NextPage = () => {

    const {loading, setLoading, backendErrors, setBackendErrors} = useContext(Context);
    const [pageLoad, setPageLoad] = useState(true);
    const [selected, setSelected] = useState<number[]>([]);
    const [sensors, setSensors] = useState<ISensor[]>([]);
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

    const fetchData = async () => {
        const response = await fetch("http://localhost:8080/readAll");
        response.json().then((json) => {
            setSensors(json);
            setPageLoad(false);
        });
    };

    const headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    });

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
        setBackendErrors('');
        const formErrors = validateForm(formData, setErrors, errors);
        if (selected?.length === 1 && !formErrors.timestamp && !formErrors.humidity && !formErrors.temperature) {
            setLoading(true);
            selected.forEach(async (id) => {
                const rawResponse = await fetch('http://localhost:8080/update', {
                    method: 'PUT',
                    headers,
                    body: JSON.stringify({...formData, id: String(id)})
                });
                if (rawResponse.status !== 200) {
                    const content = await rawResponse.json();
                    setBackendErrors(content.message);
                } else {
                    fetchData();
                    setIsUpdate(false);
                    setSelected([]);
                }
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();

        return () => {
            setBackendErrors('');
        }
    }, []);

    return (
        <Structure>
            {!isUpdate ? <Table
                    sensors={sensors}
                    setSensors={setSensors}
                    selected={selected}
                    setSelected={setSelected}
                    getUpdateData={getUpdateData}
                    pageLoad={pageLoad}
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
                        onClick={() => {
                            setIsUpdate(false);
                            setBackendErrors('');
                        }}
                        className={styles.button}>
                        Cancel Update
                    </Button>
                </>}

        </Structure>
    );
};

export default Delete;
