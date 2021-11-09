export interface ContextProps {
    backendErrors: string | undefined;
    loading: boolean;
}

export interface IFormData {
    [sensorId: string]: string | null;

    timestamp: string | null;
    temperature: string | null;
    humidity: string | null;
}

export interface IFormDataError {
    [sensorId: string]: boolean;

    timestamp: boolean;
    temperature: boolean;
    humidity: boolean;
}

export interface ISensor {
    sensor_id: string | null;
    timestamp: string | null;
    temperature: string | null;
    humidity: string | null;
    id?: string | null;
}

export interface IChartDTO {
    sensor_id: string | null;
    entries: [{
        timestamp: string | null,
        temperature: string | null,
        humidity: string | null
    }]
}
