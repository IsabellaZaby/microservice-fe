import { IFormData, IFormDataError } from "./interfaces";

export const classNamesHelper = (classes: (string | boolean)[]) => {
    return classes.filter((val) => typeof val === 'string').join(" ");
};

export enum COMMON_CONSTANTS {
    UPDATE = 'update',
    INPUT = 'input'
}

export const validateForm = (formData: IFormData, setErrors: (err: IFormDataError) => void, errors: IFormDataError) => {
    const keys = Object.keys(formData);
    const formErrors: IFormDataError = {...errors};
    keys.map((key) => {
        const value = formData[key];
        if (value === null || value.length <= 0) {
            formErrors[key] = true;
        }
    });
    setErrors({...formErrors});
    return formErrors;
};