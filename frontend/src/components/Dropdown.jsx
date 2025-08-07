/*
 * Brice Jenkins and Andrew Heilesen
 * Copyright: 2025
 * 
 * 
 * Citation for use of AI Tools:
 * Date: 8/6/2025
 * Adapted From: Google AI overview.
 * Prompt used: "how to make a dropdown that gets option from sql table react"
 * Source URL: https://www.google.com/
 */

import { useEffect, useState } from 'react';

/**
 * Creates an HTML dropdown component that retrieves options based on a specified
 * route path.
 * @param {string} backendURL The URL used to host the application.
 * Is needed to initiate get requests.
 * @param {string} routePath The path of the specific route handler.
 * @param {string} colName The column name of the data returned from the query.
 * @param {boolean} isReadOnly If the dropdown is read only (for viewing).
 * @param {boolean} isRequired If the dropdown information is required.
 * @param {string} selectedVal A value to prepopulate dropdown (if editing or viewing). 
 * @returns An HTML form with various inputs for Firearms data.
 */
function Dropdown ({backendURL, routePath, colName, isReadOnly, isRequired, selectedVal}) {
    const [options, setOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');

    // Calls the specified route handler to retrieve dropdown information.
    const loadOptions = async () => {
        try {
            const response = await fetch(backendURL + routePath);
            const data = await response.json();
            setOptions(data);
        } catch (error) {
            console.log (error)
        }
    };

    useEffect( () => {
        loadOptions();
    }, []);

    // Sets default selected value (if applicable).
    useEffect ( () => {
        setSelectedValue(selectedVal);
    }, [selectedVal])

    return (
        <select
            type ='text'
            name = {colName}
            readOnly = {isReadOnly}
            required = {isRequired}
            value = {selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}>
                <option disabled value="">Select an option</option>
                {options.map(option => (
                    <option key={option.id} value={option.id}>
                        {option[colName]}
                </option>
                ))}
        </select>
    )
}

export default Dropdown;