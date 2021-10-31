import type { NextPage } from "next";
import React, { useState } from "react";
import Structure from "../components/Structure";
import { Box, Button } from "@mui/material";
import styles from "../styles/Input.module.scss";
import SensorForm from "../components/SensorForm";
import { IFormData, IFormDataError } from "../components/interfaces";
import { formatISO } from "date-fns";
import { LoadingButton } from "@mui/lab";
import { COMMON_CONSTANTS, validateForm } from "../components/utils";

const initialFormState: IFormData = {
    sensorId: '',
    timestamp: formatISO(new Date()),
    temperature: '',
    humidity: ''
};

const initialFormErrorState: IFormDataError = {
    sensorId: false,
    timestamp: false,
    temperature: false,
    humidity: false
};

const Input: NextPage = () => {
    const [backendError, setBackendError] = useState(undefined);
    const [sensorAdded, setSensorAdded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<IFormDataError>(initialFormErrorState);
    const [formData, setFormData] = useState<IFormData>(initialFormState);

    const resetForm = () => {
        setSensorAdded(false)
        setFormData(initialFormState);
        setErrors(initialFormErrorState);
    };


    const submitForm = async () => {
        setLoading(true);
        const formErrors = validateForm(formData, setErrors, errors);
        if (!formErrors.timestamp && !formErrors.sensorId && !formErrors.humidity && !formErrors.temperature) {
            const rawResponse = await fetch('http://localhost:8080/add', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
            });
            if (rawResponse.status !== 200) {
                const content = await rawResponse.json();
                setBackendError(content.message);
            } else {
                setSensorAdded(true);
            }
        }
        setLoading(false);
    };

    return (
        <Structure error={backendError}>
            <h1>Input</h1>
            {!sensorAdded ? <Box component="form">
                    <div className={styles.wrapper}>
                        <SensorForm
                            type={COMMON_CONSTANTS.INPUT}
                            errors={errors}
                            setErrors={setErrors}
                            setFormData={setFormData}
                            formData={formData}/>
                        <LoadingButton
                            loading={loading}
                            variant="contained"
                            onClick={submitForm}>
                            Submit
                        </LoadingButton>
                    </div>
                </Box> :
                <>
                    <h2>Sensor added!</h2>
                    <Button
                        variant="contained"
                        onClick={resetForm}>
                        Add another
                    </Button>
                </>}
        </Structure>
    );
};

export default Input;