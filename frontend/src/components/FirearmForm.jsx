import { useEffect, useState } from 'react';

/**
 * Creates an HTML form that can be used for both editing and creating
 * Firearms entries. 
 * @param {string} mode A mode, either 'create' or 'edit'.
 * @param {object} firearmToEdit A Firearms object.
 * @returns An HTML form with various inputs for Firearms data.
 */
function FirearmForm ({mode, firearmToEdit}) {
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
                        name='Serial Number'
                        required='required'
                        placeholder='Enter Serial Number here'
                        value={firearmData['ID'] || ''}
                        onChange={onChangeHandler} />
                </label>
                &nbsp;&nbsp;
                <label>Year:&nbsp;
                    <input
                        type='number'
                        name='Year'
                        required='required'
                        placeholder='Enter Year here'
                        value={firearmData['Year'] || ''}
                        onChange={onChangeHandler} />
                </label>
                <br/>
                <br/>
                <label>Make:&nbsp;
                    <select
                        type='text'
                        name='Make'
                        required='required'
                        placeholder='Select firearm make'
                        value={firearmData['Make'] || ''}
                        onChange={onChangeHandler}>
                            <option value='' disabled>Select Make</option>
                            <option value={firearmData['Make'] || ''}>{firearmData['Make'] || ''}</option>
                    </select>
                </label>
                &nbsp;&nbsp;
                <label>Model:&nbsp;
                    <select
                        type='text'
                        name='Model'
                        required='required'
                        placeholder='Select firearm model'
                        value={firearmData['Model'] || ''}
                        onChange={onChangeHandler}>
                            <option value='' disabled>Select Model</option>
                            <option value={firearmData['Model'] || ''}>{firearmData['Model'] || ''}</option>
                    </select>
                </label>
                <br/>
                <br/>
                <label>Assigned Officer:&nbsp;
                    <select
                        type='text'
                        name='Assigned Officer'
                        value={firearmData['Assigned Officer'] || ''}
                        onChange={onChangeHandler}>
                            <option value='' disabled>Select Officer</option>
                            <option value={firearmData['Assigned Officer'] || ''}>{firearmData['Assigned Officer'] || ''}</option>
                    </select>
                </label>
                &nbsp;&nbsp;
                <label>Status:&nbsp;
                    <select
                        type='text'
                        name='Active Status'
                        required='required'
                        value={firearmData['Active Status'] || ''}
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

export default FirearmForm;