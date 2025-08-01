import { useEffect, useState } from 'react';

/**
 * Creates an HTML form that can be used for both editing and creating
 * make entries (both Vehicles and Firearms). 
 * @param {string} mode A mode, either 'create' or 'edit'.
 * @param {object} makeToEdit Either a FirearmMakes or VehicleMakes object.
 * @returns An HTML form with various inputs for firearm or vehicle make data.
 */
function MakeForm ({mode, makeToEdit}) {
    const [makeData, setMakeData] = useState({});
    
    // Sets form data to particular make if the form is in 'edit' mode.
    useEffect(() => {
        if(mode === 'edit' && makeToEdit) {
            setMakeData(makeToEdit);
        } else {
            setMakeData({});
        }
    }, [mode, makeToEdit]);

    // Handles changes to form data below (if edited).
    const onChangeHandler = (f) => {
        const { name, value } = f.target;
        setMakeData((previous) => ({
            ...previous,
            [name]: value
        }));
    }

    return (
        <div className='make-form'>
            <label>Make:&nbsp;
                <input
                    type='text'
                    name='Make'
                    required='required'
                    placeholder='Enter Make here'
                    value={makeData['Make'] || ''}
                    onChange={onChangeHandler} />
            </label>
        </div>
    );
}

export default MakeForm;