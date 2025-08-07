import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '../components/Table';
import Dropdown from '../components/Dropdown';

/**
 * Creates an HTML form that can be used for both editing and creating
 * Incidents entries. 
 * @param {string} mode A mode, either 'create', 'edit', or 'view'.
 * @param {object} incidentData An Incidents object.
 * @returns An HTML form with various inputs for Incidents data.
 */
function IncidentForm ({backendURL, mode, incidentData, otherOfficers, editButtonHandler}) {
    const [incident, setIncidentData] = useState({});

    // For use in restricting editing when in 'view' mode.
    let isReadOnly = true;
    if (mode !== 'view') {
        isReadOnly = false;
    }
    
    // Prepopulates fields with incidentData if in 'edit' or 'view' mode.
    useEffect(() => {
        if(mode!=='create' && incidentData) {
            setIncidentData(incidentData[0]);
        } else {
            setIncidentData({});
        }
    }, [mode, incidentData]);

    // Handles changes to form fields when in editing mode.
    const onChangeHandler = (f) => {
        const { name, value } = f.target;
        setIncidentData((previous) => ({
            ...previous,
            [name]: value
        }));
    }

    return (
        <div className='incident-form'>
            <fieldset>
                {mode!='create' &&
                    <label>Incident Number:&nbsp;
                        <input
                            type='number'
                            readOnly
                            required='required'
                            value={incident['ID'] || ''}/>
                    </label>
                }
                &nbsp;&nbsp;
                <label>Date:&nbsp;
                    <input
                        className='date-picker'
                        type='date'
                        name='Date'
                        readOnly = {isReadOnly}
                        required='required'
                        placeholder='mm-dd-yyyy'
                        value={incident['Date'] || ''}
                        onChange={onChangeHandler} />
                </label>
                &nbsp;&nbsp;
                <label>Case Officer:&nbsp;
                    <Dropdown
                        backendURL={backendURL}
                        routePath={'/officers'}
                        colName='Last Name'
                        isReadOnly={isReadOnly}
                        isRequired='required'
                        selectedVal={incident['Last Name'] || ''}>
                    </Dropdown>
                </label>
                &nbsp;&nbsp;
                <label>Status:&nbsp;
                    <select
                        type='text'
                        name='Active Status'
                        disabled = {isReadOnly}
                        required='required'
                        value={incident['Active Status'] || ''}
                        onChange={onChangeHandler}>
                            <option value='1'>Active</option> 
                            <option value='0'>Inactive</option>
                    </select>
                </label>
                <br/>
                <br/>
                <div className='narrative-container'>
                    <label>Narrative:<br/>
                        <textarea className='incident-narrative'
                            type='text'
                            name='Narrative'
                            readOnly = {isReadOnly}
                            placeholder='Enter your narrative here'
                            value={incident['Narrative'] || ''}
                            onChange={onChangeHandler} />
                    </label>
                &nbsp;&nbsp;
                    <div className='small-table-container'>
                        <label>Affiliated Officers
                            <Table  tableData={otherOfficers}></Table>
                        </label>
                        <a href='#'>+ Add an Officer</a>
                    </div>
                </div>
                
                
                <br/>
                <br/>
                <div className='update-button'>
                    {mode != 'view' &&
                    <button 
                        onClick = {e => {
                            e.preventDefault();
                            editButtonHandler()}}>Save
                    </button>}
                </div>
            </fieldset>
        </div>
    );
}

export default IncidentForm;