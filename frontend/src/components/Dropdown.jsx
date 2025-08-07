import { useEffect, useState } from 'react';

/*prompt: "how to make a dropdown that gets option from sql table react"*/

function Dropdown ({backendURL, routePath, colName, isReadOnly, isRequired, selectedVal}) {
    const [options, setOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');

    const loadOptions = async () => {
        try {
            const response = await fetch(backendURL + routePath);
            const data = await response.json();
            setOptions(data);
        } catch (error) {
            console.log (error)
        }
    };

    // Cannot pass an async function to useEffect; however, the anonymous
    // function passed can call loadOptions().
    useEffect( () => {
        loadOptions();
    }, []);

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