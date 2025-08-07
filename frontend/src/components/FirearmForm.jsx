import { useEffect, useState } from 'react';
import Dropdown from '../components/Dropdown';

/**
 * Creates an HTML form that can be used for both editing and creating
 * Firearms entries. 
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
                    <Dropdown
                        backendURL={backendURL}
                        routePath={`/firearm-makes`}
                        colName='Make'
                        isRequired='required'
                        selectedVal={firearmData['Make'] || ''}>
                    </Dropdown>
                </label>
                &nbsp;&nbsp;
                <label>Model:&nbsp;
                    <Dropdown
                        backendURL={backendURL}
                        routePath={`/firearm-models`}
                        colName='Model'
                        isRequired='required'
                        selectedVal={firearmData['Model'] || ''}>
                    </Dropdown>
                </label>
                <br/>
                <br/>
                <label>Assigned Officer:&nbsp;
                    <Dropdown
                        backendURL={backendURL}
                        routePath={'/officers'}
                        colName='Last Name'
                        isRequired='required'
                        selectedVal={firearmData['Assigned Officer'] || ''}>
                    </Dropdown>
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