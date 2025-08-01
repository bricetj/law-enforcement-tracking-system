import { useEffect, useState } from 'react';

/**
 * Creates an HTML form that can be used for both editing and creating
 * model entries (both Vehicles and Firearms). 
 * @param {string} mode A mode, either 'create' or 'edit'.
 * @param {object} modelToEdit Either a FirearmModels or VehicleModels object.
 * @returns An HTML form with various inputs for firearm or vehicle model data.
 */
function ModelForm ({mode, modelToEdit}) {
    const [modelData, setModelData] = useState({});
    
    // Sets form data to particular model if the form is in 'edit' mode.
    useEffect(() => {
        if(mode === 'edit' && modelToEdit) {
            setModelData(modelToEdit);
        } else {
            setModelData({});
        }
    }, [mode, modelToEdit]);

    // Handles changes to form data below (if edited).
    const onChangeHandler = (f) => {
        const { name, value } = f.target;
        setModelData((previous) => ({
            ...previous,
            [name]: value
        }));
    }

    return (
        <div className='model-form'>
            <label>Make:&nbsp;
                <select
                    type='text'
                    name='Make'
                    required='required'
                    value={modelData['Make'] || ''}
                    onChange={onChangeHandler}>
                        <option value='' disabled>Select Make</option>
                        <option value={modelData['Make'] || ''}>{modelData['Make'] || ''}</option>
                </select>
            </label>
            &nbsp;&nbsp;
            <label>Model:&nbsp;
                <input
                    type='text'
                    name='Model'
                    required='required'
                    placeholder='Enter Model here'
                    value={modelData['Model'] || ''}
                    onChange={onChangeHandler} />
            </label>
        </div>
    );
}

export default ModelForm;