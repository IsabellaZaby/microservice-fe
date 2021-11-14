import React, { useState, useEffect } from 'react';
import styles from './styles/LocationDateTime.module.scss';

const LocationDateTime = () => {

    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000)
        return () => {
            clearInterval(timer)
        };
    });

    return (
        <div className={styles.wrapper}>
            {date.toDateString() + " " + date.toLocaleTimeString()}
        </div>
    )
}

export default LocationDateTime;
