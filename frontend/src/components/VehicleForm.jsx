/*
 * Brice Jenkins and Andrew Heilesen
 * Copyright: 2025
 */


import { useEffect, useState } from 'react';
import Dropdown from '../components/Dropdown';
import { useNavigate } from 'react-router-dom';

/**
 * Creates an HTML form that can be used for both editing and creating
 * Vehicles entries. 
 * @param {string} backendURL The URL used to host the application.
 * Is needed to initiate get requests.
 * @param {string} mode A mode, either 'create' or 'edit'.
 * @param {object} vehicleToEdit A Vehicles object.
 * @returns An HTML form with various inputs for Vehicles data.
 */
function VehicleForm ({backendURL, mode, vehicleToEdit}) {
    const [vehicleData, setVehicleData] = useState({});
    const navigate = useNavigate();

    // Calls the 'POST /vehicles' endpoint in the REST API.
    const createVehicle = async () => {
        const response = await fetch(backendURL + '/vehicles', 
                {
                    method: 'POST',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify(vehicleData)
                }
        );
        // User is alerted if officer is successfully created and then is
        // redirected back to the page.
        if(response.status === 201){
                alert('The vehicle record was successfully created.');
            } else {
                alert('Failed to create vehicle record, status code = ' + response.status);
            };
        navigate('/vehicles')
    };

     // Calls the 'PUT /vehicles/:id' endpoint in the REST API.
    const updateVehicle = async () => {
        const response = await fetch(backendURL + `/vehicles/${vehicleToEdit['id']}`, {
                    method: 'PUT',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify(vehicleData)
                }
        );
        // User is alerted if officer is successfully updated and page reloads.
        if(response.status === 200){
                alert('Successfully edited the vehicle record.');
            } else {
                alert('Failed to edit vehicle record, status code = ' + response.status)
            }
            navigate('/vehicles');
    };

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

    // Handles submission of the form based on edit or create mode.
    const submitHandler = (event) => {
        event.preventDefault()
        if(mode === 'edit') {
            updateVehicle();
        } else if (mode === 'create') {
            createVehicle();
        }
    }

    return (
        <div>
            <form className='vehicle-form' onSubmit={submitHandler}>
            <fieldset>
                <label>VIN:&nbsp;
                    <input
                        type='text'
                        name='id'
                        required='required'
                        placeholder='Enter VIN here'
                        value={vehicleData['id'] || ''}
                        onChange={onChangeHandler} />
                </label>
                &nbsp;&nbsp;
                <label>Color:&nbsp;
                    <select
                        type='text'
                        name='color'
                        required='required'
                        placeholder='Select vehicle color'
                        value={vehicleData['color'] || ''}
                        onChange={onChangeHandler}>
                            <option value='' disabled>Select Color</option>
                            <option value='Black'>Black</option>
                            <option value='Blue'>Blue</option>
                            <option value='Brown'>Brown</option>
                            <option value='Gold'>Gold</option>
                            <option value='Green'>Green</option>
                            <option value='Gray'>Gray</option>
                            <option value='Orange'>Orange</option>
                            <option value='Purple'>Purple</option>
                            <option value='Red'>Red</option>
                            <option value='Silver'>Silver</option>
                            <option value='White'>White</option>
                            <option value='Yellow'>Yellow</option>
                    </select>
                </label>
                &nbsp;&nbsp;
                <label>Year:&nbsp;
                    <input
                        type='number'
                        name='year'
                        required='required'
                        placeholder='Enter year here'
                        value={vehicleData['year'] || ''}
                        onChange={onChangeHandler} />
                </label>
                <br/>
                <br/>
                &nbsp;&nbsp;
                <label>Model:&nbsp;
                    <Dropdown
                        backendURL={backendURL}
                        routePath={`/vehicle-models`}
                        colName='modelID'
                        displayName1={'Make'}
                        displayName2={'Model'}
                        isRequired='required'
                        selectedVal={vehicleData['modelID'] || ''}
                        onChangeHandler={onChangeHandler}>
                    </Dropdown>
                </label>
                &nbsp;&nbsp;
                <label>License Plate:&nbsp;
                    <input
                        type='text'
                        name='licensePlate'
                        required='required'
                        placeholder='Enter License Plate here'
                        value={vehicleData['licensePlate'] || ''}
                        onChange={onChangeHandler}/>
                </label>
                <br/>
                <br/>
                {mode == 'edit' &&
                <label>Assigned Officer:&nbsp;
                    <Dropdown
                        backendURL={backendURL}
                        routePath={'/officers'}
                        colName='officerID'
                        displayName1='First Name'
                        displayName2='Last Name'
                        isRequired='required'
                        selectedVal={vehicleData['officerID'] || ''}
                        onChange={onChangeHandler}>
                    </Dropdown>
                </label>}
                &nbsp;&nbsp;
                <label>Status:&nbsp;
                    <select
                        type='text'
                        name='isActive'
                        required='required'
                        value={vehicleData['isActive'] || ''}
                        onChange={onChangeHandler}>
                            <option value='0'>Inactive</option>
                            <option value='1'>Active</option> 
                    </select>
                </label>
                <br/>
                <br/>
                <div className='update-button'>
                    <button type='submit'>Save</button>
                </div>
            </fieldset>
            </form>
        </div>
    );
}

export default VehicleForm;