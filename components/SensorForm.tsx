import React, { FC } from "react";
import styles from "../styles/Input.module.scss";
import { TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { de } from "date-fns/locale";
import { formatISO } from "date-fns";
import { IFormData, IFormDataError } from "./interfaces";
import { COMMON_CONSTANTS } from "./utils";

interface ISensorForm {
    type: string;
    setFormData: (data: IFormData) => void;
    formData: IFormData;
    setErrors: (err: IFormDataError) => void;
    errors: IFormDataError;
}

const SensorForm: FC<ISensorForm> = (props) => {
    const {type, errors, formData, setErrors, setFormData} = props;

    const handleInput = (e: any) => {
        setErrors({...errors, [e?.target?.id]: false});
        setFormData({
            ...formData,
            [e?.target?.id]: e.target.value
        });
    };

    const handleDateChange = (e: any) => {
        setErrors({...errors, [e?.target?.id]: false});
        setFormData({...formData, timestamp: formatISO(e)});
    };

    return (
        <>
            <TextField
                className={styles.field}
                id="sensorId"
                label="Sensor-ID *"
                variant="outlined"
                onChange={handleInput}
                error={errors.sensorId}
                helperText={errors.sensorId && "This field is required."}
                value={formData.sensorId}
                disabled={type === COMMON_CONSTANTS.UPDATE}
            />
            <LocalizationProvider dateAdapter={DateAdapter} locale={de}>
                <DateTimePicker
                    label="Timestamp (will be converted) *"
                    value={formData.timestamp}
                    onChange={handleDateChange}
                    inputFormat="dd-MM-yyyy HH:mm:ss"
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            error={errors.timestamp}
                            helperText={errors.timestamp && "This field is required."}
                        />}
                />
            </LocalizationProvider>
            <TextField
                className={styles.field}
                id="temperature"
                label="Temperature * "
                variant="outlined"
                onChange={handleInput}
                error={errors.temperature}
                helperText={errors.temperature && "This field is required."}
                value={formData.temperature}
            />
            <TextField
                className={styles.field}
                id="humidity"
                label="Humidity *"
                variant="outlined"
                onChange={handleInput}
                error={errors.humidity}
                helperText={errors.humidity && "This field is required."}
                value={formData.humidity}
            />
        </>
    );
};

export default SensorForm;