import { useEffect, useState } from 'react';

/**
 * Creates an HTML form that can be used for both editing and creating
 * Vehicles entries. 
 * @param {string} mode A mode, either 'create' or 'edit'.
 * @param {object} vehicleToEdit A Vehicles object.
 * @returns An HTML form with various inputs for Vehicles data.
 */
function VehicleForm ({mode, vehicleToEdit}) {
    const [vehicleData, setVehicleData] = useState({});
    
    // Sets form data to particular Vehicle if the form is in 'edit' mode.
    useEffect(() => {
        if(mode === 'edit' && vehicleToEdit) {
            setVehicleData(vehicleToEdit);
        } else {
            setVehicleData({});
        }
    }, [mode, vehicleToEdit]);

    // Handles editing form fields below.
    const onChangeHandler = (f) => {
        const { name, value } = f.target;
        setVehicleData((previous) => ({
            ...previous,
            [name]: value
        }));
    }

    return (
        <div className='vehicle-form'>
            <fieldset>
                <label>VIN:&nbsp;
                    <input
                        type='text'
                        name='VIN'
                        required='required'
                        placeholder='Enter VIN here'
                        value={vehicleData['ID'] || ''}
                        onChange={onChangeHandler} />
                </label>
                &nbsp;&nbsp;
                <label>Color:&nbsp;
                    <select
                        type='text'
                        name='Color'
                        required='required'
                        placeholder='Select vehicle color'
                        value={vehicleData['Color'] || ''}
                        onChange={onChangeHandler}>
                            <option value='' disabled>Select Color</option>
                            <option value={vehicleData['Color'] || ''}>{vehicleData['Color'] || ''}</option>
                    </select>
                </label>
                &nbsp;&nbsp;
                <label>Year:&nbsp;
                    <input
                        type='number'
                        name='Year'
                        required='required'
                        placeholder='Enter year here'
                        value={vehicleData['Year'] || ''}
                        onChange={onChangeHandler} />
                </label>
                <br/>
                <br/>
                <label>Make:&nbsp;
                    <select
                        type='text'
                        name='Make'
                        required='required'
                        placeholder='Select vehicle make'
                        value={vehicleData['Make'] || ''}
                        onChange={onChangeHandler}>
                            <option value='' disabled>Select Make</option>
                            <option value={vehicleData['Make'] || ''}>{vehicleData['Make'] || ''}</option>
                    </select>
                </label>
                &nbsp;&nbsp;
                <label>Model:&nbsp;
                    <select
                        type='text'
                        name='Model'
                        required='required'
                        placeholder='Select vehicle model'
                        value={vehicleData['Model'] || ''}
                        onChange={onChangeHandler}>
                            <option value='' disabled>Select Model</option>
                            <option value={vehicleData['Model'] || ''}>{vehicleData['Model'] || ''}</option>
                    </select>
                </label>
                &nbsp;&nbsp;
                <label>License Plate:&nbsp;
                    <input
                        type='text'
                        name='License Plate'
                        required='required'
                        placeholder='Enter License Plate here'
                        value={vehicleData['License Plate'] || ''}
                        onChange={onChangeHandler} />
                </label>
                <br/>
                <br/>
                <label>Assigned Officer:&nbsp;
                    <select
                        type='text'
                        name='Assigned Officer'
                        placeholder='Select Officer'
                        value={vehicleData['Assigned Officer'] || ''}
                        onChange={onChangeHandler}>
                            <option value='' disabled>Select Officer</option>
                            <option value={vehicleData['Assigned Officer'] || ''}>{vehicleData['Assigned Officer'] || ''}</option>
                    </select>
                </label>
                &nbsp;&nbsp;
                <label>Status:&nbsp;
                    <select
                        type='text'
                        name='Active Status'
                        required='required'
                        value={vehicleData['Active Status'] || ''}
                        onChange={onChangeHandler}>
                            <option value='1'>Active</option> 
                            <option value='0'>Inactive</option>
                    </select>
                </label>
                <br/>
                <br/>
                <div className='update-button'>
                    <button>Save</button>
                </div>
            </fieldset>
        </div>
    );
}

export default VehicleForm;