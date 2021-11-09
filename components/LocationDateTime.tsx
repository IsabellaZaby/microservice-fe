import React, { useState, useEffect } from 'react'

const LocationDateTime = () => {

    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000)
        return () => {
            clearInterval(timer)
        };
    });

    return (
        <div>
            {date.toDateString() + " " + date.toLocaleTimeString()}
        </div>
    )
}

export default LocationDateTime;