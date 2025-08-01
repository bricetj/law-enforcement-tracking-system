import { useEffect, useState } from 'react';

/**
 * Creates an HTML form that can be used for both editing and creating
 * Officers entries. 
 * @param {string} mode A mode, either 'create' or 'edit'.
 * @param {object} officerToEdit An Officers object.
 * @returns An HTML form with various inputs for Officers data.
 */
function OfficerForm ({mode, officerToEdit}) {
    const [officerData, setOfficerData] = useState({});
    
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

    return (
        <div className='officer-form'>
            <fieldset>
                <label>First Name:&nbsp;
                    <input
                        type='text'
                        name='First Name'
                        required='required'
                        placeholder='Enter first name here'
                        value={officerData['First Name'] || ''}
                        onChange={onChangeHandler} />
                </label>
                &nbsp;&nbsp;
                <label>Middle Name:&nbsp;
                    <input
                        type='text'
                        name='Middle Name'
                        placeholder='Enter middle name here'
                        value={officerData['Middle Name'] || ''}
                        onChange={onChangeHandler} />
                </label>
                &nbsp;&nbsp;
                <label>Last Name:&nbsp;
                    <input
                        type='text'
                        name='Last Name'
                        required='required'
                        placeholder='Enter last name here'
                        value={officerData['Last Name'] || ''}
                        onChange={onChangeHandler} />
                </label>
                <br/>
                <br/>
                <label>SSN:&nbsp;
                    <input
                        type='text'
                        name='SSN'
                        required='required'
                        placeholder='###-##-####'
                        value={officerData['SSN'] || ''}
                        onChange={onChangeHandler} />
                </label>
                &nbsp;&nbsp;
                <label>Date of Birth:&nbsp;
                    <input
                        type='date'
                        name='Date of Birth'
                        required='required'
                        value={officerData['Date of Birth'] || ''}
                        onChange={onChangeHandler} />
                </label>
                &nbsp;&nbsp;
                <label>Address:&nbsp;
                    <input
                        type='text'
                        name='Address'
                        value={officerData['Address'] || ''}
                        onChange={onChangeHandler} />
                </label>
                <br/>
                <br/>
                <label>Email:&nbsp;
                    <input
                        type='text'
                        name='Email'
                        value={officerData['Email'] || ''}
                        onChange={onChangeHandler} />
                </label>
                &nbsp;&nbsp;
                <label>Status:&nbsp;
                    <select
                        type='text'
                        name='Active Status'
                        required='required'
                        value={officerData['Active Status'] || ''}
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

export default OfficerForm;