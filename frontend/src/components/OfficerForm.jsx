/*
 * Brice Jenkins and Andrew Heilesen
 * Copyright: 2025
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Creates an HTML form that can be used for both editing and creating
 * Officers entries.
* @param {string} backendURL The URL used to host the application.
 * Is needed to initiate get requests. 
 * @param {string} mode A mode, either 'create' or 'edit'.
 * @param {object} officerToEdit An Officers object.
 * @returns An HTML form with various inputs for Officers data.
 */
function OfficerForm ({backendURL, mode, officerToEdit}) {
    const [officerData, setOfficerData] = useState({});
    const navigate = useNavigate();

    // Calls the 'POST /officers' endpoint in the REST API.
    const createOfficer = async () => {
        const response = await fetch(backendURL + '/officers', 
                {
                    method: 'POST',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify(officerData)
                }
        );
        // User is alerted if officer is successfully created and then is
        // redirected back to the /officers page.
        if(response.status === 201){
                alert('The officer record was successfully created.');
            } else {
                alert('Failed to create officer record, status code = ' + response.status);
            };
        navigate('/officers')
    };

     // Calls the 'PUT /officers/:id' endpoint in the REST API to update an officer.
    const updateOfficer = async () => {
        const response = await fetch(backendURL + `/officers/${officerToEdit['id']}`, {
                    method: 'PUT',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify(officerData)
                }
        );
        // User is alerted if officer is successfully updated and redirected to /officers.
        if(response.status === 200){
                alert('Successfully edited the officer record.');
            } else {
                alert('Failed to edit officer record, status code = ' + response.status)
            }
            navigate('/officers');
    };

    // Sets form data to particular officer if the form is in 'edit' mode.
    useEffect(() => {
        if(mode === 'edit' && officerToEdit) {
            setOfficerData(officerToEdit);
        } else {
            setOfficerData({});
        }
    }, [mode, officerToEdit]);


    // Handles changes to form data below (if edited).
    const onChangeHandler = (f) => {
        const { name, value } = f.target;
        setOfficerData((previous) => ({
            ...previous,
            [name]: value
        }));
    }

    // Handles submission of the form based on edit or create mode.
    const submitHandler = (event) => {
        event.preventDefault()
        if(mode === 'edit') {
            updateOfficer();
        } else if (mode === 'create') {
            createOfficer();
        }
    }

    return (
        <div>
        <form className='officer-form' onSubmit={submitHandler}>
            <fieldset>
                <label>First Name:&nbsp;
                    <input
                        type='text'
                        name='firstName'
                        required
                        placeholder='Enter first name here'
                        value={officerData['firstName'] || ''}
                        onChange={onChangeHandler} />
                </label>
                &nbsp;&nbsp;
                <label>Middle Name:&nbsp;
                    <input
                        type='text'
                        name='middleName'
                        placeholder='Enter middle name here'
                        value={officerData['middleName'] || ''}
                        onChange={onChangeHandler} />
                </label>
                &nbsp;&nbsp;
                <label>Last Name:&nbsp;
                    <input
                        type='text'
                        name='lastName'
                        required
                        placeholder='Enter last name here'
                        value={officerData['lastName'] || ''}
                        onChange={onChangeHandler} />
                </label>
                <br/>
                <br/>
                <label>SSN:&nbsp;
                    <input
                        type='text'
                        name='ssn'
                        required
                        placeholder='###-##-####'
                        value={officerData['ssn'] || ''}
                        onChange={onChangeHandler} />
                </label>
                &nbsp;&nbsp;
                <label>Date of Birth:&nbsp;
                    <input
                        type='date'
                        className='date-picker'
                        name='dob'
                        required
                        value={officerData['dob'] || ''}
                        onChange={onChangeHandler} />
                </label>
                &nbsp;&nbsp;
                <label>Address:&nbsp;
                    <input
                        type='text'
                        name='address'
                        value={officerData['address'] || ''}
                        onChange={onChangeHandler} />
                </label>
                <br/>
                <br/>
                <label>Email:&nbsp;
                    <input
                        type='text'
                        name='email'
                        value={officerData['email'] || ''}
                        onChange={onChangeHandler} />
                </label>
                &nbsp;&nbsp;
                <label>Status:&nbsp;
                    <select
                        type='text'
                        name='isActive'
                        required
                        value={officerData['isActive'] || ''}
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

export default OfficerForm;