/*
 * Brice Jenkins and Andrew Heilesen
 * Copyright: 2025
 */

import { useEffect, useState } from 'react';
import Dropdown from '../components/Dropdown';

/**
 * Creates an HTML form that can be used for both editing and creating
 * Firearms entries. 
 * @param {string} backendURL The URL used to host the application.
 * Is needed to initiate get requests. 
 * @param {string} mode A mode, either 'create' or 'edit'.
 * @param {object} firearmToEdit A Firearms object.
 * @returns An HTML form with various inputs for Firearms data.
 */
function FirearmForm ({backendURL, mode, firearmToEdit}) {
    const [firearmData, setFirearmData] = useState({});
    
    // Sets form data to particular firearm if the form is in 'edit' mode.
    useEffect(() => {
        if(mode === 'edit' && firearmToEdit) {
            setFirearmData(firearmToEdit);
        } else {
            setFirearmData({});
        }
    }, [mode, firearmToEdit]);

    // Handles editing form fields below.
    const onChangeHandler = (f) => {
        const { name, value } = f.target;
        setFirearmData((previous) => ({
            ...previous,
            [name]: value
        }));
    }

    return (
        <div className='firearm-form'>
            <fieldset>
                <label>Serial Number:&nbsp;
                    <input
                        type='text'
                        name='id'
                        required='required'
                        placeholder='Enter Serial Number here'
                        value={firearmData['id'] || ''}
                        onChange={onChangeHandler} />
                </label>
                &nbsp;&nbsp;
                <label>Year:&nbsp;
                    <input
                        type='number'
                        name='year'
                        required='required'
                        placeholder='Enter Year here'
                        value={firearmData['year'] || ''}
                        onChange={onChangeHandler} />
                </label>
                <br/>
                <br/>
                <label>Model:&nbsp;
                    <Dropdown
                        backendURL={backendURL}
                        routePath={`/firearm-models`}
                        colName='modelID'
                        displayName1={'Make'}
                        displayName2={'Model'}
                        isRequired='required'
                        selectedVal={firearmData['modelID'] || ''}
                        onChangeHandler={onChangeHandler}>
                    </Dropdown>
                </label>
                <br/>
                <br/>
                <label>Assigned Officer:&nbsp;
                    <Dropdown
                        backendURL={backendURL}
                        routePath={'/officers'}
                        colName='officerID'
                        displayName1='First Name'
                        displayName2='Last Name'
                        isRequired='required'
                        selectedVal={firearmData['officerID'] || ''}
                        onChange={onChangeHandler}>
                    </Dropdown>
                </label>
                &nbsp;&nbsp;
                <label>Status:&nbsp;
                    <select
                        type='text'
                        name='isActive'
                        required='required'
                        value={firearmData['isActive'] || ''}
                        onChange={onChangeHandler}>
                            <option value='0'>Inactive</option>
                            <option value='1'>Active</option> 
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

export default FirearmForm;