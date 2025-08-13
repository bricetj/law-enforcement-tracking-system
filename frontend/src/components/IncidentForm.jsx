/*
 * Brice Jenkins and Andrew Heilesen
 * Copyright: 2025
 */

import { useEffect, useState, useCallback } from 'react';
import Table from '../components/Table';
import Dropdown from '../components/Dropdown';
import PopupWindow from './PopupWindow';
import {useNavigate} from 'react-router-dom';
import { PiCoinsBold } from 'react-icons/pi';

/**
 * Creates an HTML form that can be used for both editing and creating
 * Incidents entries. 
 * @param {string} backendURL The URL used to host the application.
 * Is needed to initiate get requests.
 * @param {string} mode A mode, either 'create', 'edit', or 'view'.
 * @param {array} incidentData An Incidents object in an array.
 * @param {array} otherOfficers Officers objects in an array.
 * @param {function} editButtonHandler A function to change edit button state
 * when save button is pressed.
 * @returns An HTML form with various inputs for Incidents data.
 */
function IncidentForm ({backendURL, mode, incidentData, otherOfficers, editButtonHandler}) {
    const [incident, setIncidentData] = useState({});
    const [otherOfficersTable, setOtherOfficersTable] = useState();
    const [popupOpen, setPopupOpen] = useState(false);
    const [otherOfficer, setOtherOfficer] = useState({});
    const navigate = useNavigate();

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

    // Prefills affiliated officer table with data.
    useEffect(() => {
        setOtherOfficersTable(otherOfficers);
    }, [otherOfficers])

    // Used to create a new affiliated officer and then wait for response to 
    // update table.
    const createAffiliatedOfficer = useCallback(async () => {
        const response = await fetch(backendURL + '/affiliated-officers', 
            {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({'officerID': otherOfficer, 'incidentID': incident.id, 'isCaseOfficer': 0})
            }
        );
        if(response.status === 201){
            alert('The affiliated officer was successfully added.');
            // Calls the /incidents/affiliated-officers/:id route handler.
            try {
                const response = await fetch(backendURL + `/incidents/affiliated-officers/${incident['id']}`);
                const data = await response.json();
                setOtherOfficersTable(data);
            } catch (error) {
                console.log(error);
            }
        } else {
            alert('Failed to add affiliated officer, status code = ' + response.status);
        };
    }, [otherOfficer, incident])

    // Calls the 'POST /incidents' endpoint in the REST API.
    const createIncident = async () => {
        const response = await fetch(backendURL + '/incidents', 
                {
                    method: 'POST',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify(incident)
                }
        );
        // User is alerted if incident is successfully created and then is
        // redirected back to the incidents page.
        if(response.status === 201){
                alert('The incident record was successfully created.');
            } else {
                alert('Failed to create incident record, status code = ' + response.status);
            };
            navigate('/incidents')
    };

     // Calls the 'PUT /incidents/:id' endpoint in the REST API.
    const updateIncident = useCallback(async () => {
        const response = await fetch(backendURL + `/incidents/${incident['id']}`, {
                    method: 'PUT',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify(incident)
                }
        );

        // User is alerted if incident is successfully updated and redirects back to incidents.
        if(response.status === 200){
            alert('Incident successfully updated!');
        } else {
            alert('Failed to edit incident record, status code = ' + response.status)
        }
        navigate('/incidents')
    }, [incident]);


    // Calls the Delete route handler.
    const onDelete = async (id) => {
        const response = await fetch(backendURL + `/incidents/officers/${id}/${incident['id']}`, { method: 'DELETE' });
        if (response.status === 204) {
            try {
                const response = await fetch(backendURL + `/incidents/affiliated-officers/${incident['id']}`);
                const data = await response.json();
                setOtherOfficersTable(data);
            } catch (error) {
                console.log(error);
            }
        } else {
            alert(`Failed to delete affiliated officer, status code = ${response.status}`)
        }
    }

    // Handles changes to form fields when in editing mode.
    const onChangeHandler = (f) => {
        const { name, value } = f.target;
        setIncidentData((previous) => ({
            ...previous,
            [name]: value
        }));
    }

     // Handles submission of the form based on edit or create mode.
    const submitHandler = (event) => {
        event.preventDefault()
        if(mode === 'edit') {
            updateIncident();
        } else if (mode === 'create') {
            createIncident();
        }
        editButtonHandler();
    }

    // Handles opening the popup window.
    const openPopupHandler = (f) => {
        setPopupOpen(true);
    }

    // Handles changes in selection from the Affiliated officers popup.
    const onPopupChangeHandler = (f) => {
        const {value} = f.target;
        setOtherOfficer(value);
    }

    // Handles closing the popup window.
    const onClose = () => {
        setPopupOpen(false);
    }

    // Handles saving an affiliated officer selection.
    const onSave = (officerID) => {
        setOtherOfficer(officerID);
        createAffiliatedOfficer();
        setPopupOpen(false);
    }


    return (
        <div>
            <form className='incident-form' onSubmit={submitHandler}>
            <fieldset>
                {mode!='create' &&
                    <label>Incident Number:&nbsp;
                        <input
                            type='number'
                            readOnly
                            required='required'
                            value={incident['id'] || ''}/>
                    </label>
                }
                &nbsp;&nbsp;
                <label>Date:&nbsp;
                    <input
                        className='date-picker'
                        type='date'
                        name='date'
                        readOnly = {isReadOnly}
                        required='required'
                        placeholder='mm-dd-yyyy'
                        value={incident['date'] || ''}
                        onChange={onChangeHandler} />
                </label>
                &nbsp;&nbsp;
                <label>Case Officer:&nbsp;
                    <Dropdown
                        backendURL={backendURL}
                        routePath={'/officers'}
                        colName='officerID'
                        displayName1='First Name'
                        displayName2='Last Name'
                        isReadOnly={isReadOnly}
                        isRequired='required'
                        selectedVal={incident['officerID'] || ''}
                        onChangeHandler={onChangeHandler}>
                    </Dropdown>
                </label>
                &nbsp;&nbsp;
                <label>Status:&nbsp;
                    <select
                        type='text'
                        name='isActive'
                        disabled = {isReadOnly}
                        required='required'
                        value={incident['isActive'] || ''}
                        onChange={onChangeHandler}>
                            <option value='0'>Inactive</option>
                            <option value='1'>Active</option> 
                    </select>
                </label>
                <br/>
                <br/>
                <div className='narrative-container'>
                    <label>Narrative:<br/>
                        <textarea className='incident-narrative'
                            type='text'
                            name='description'
                            readOnly = {isReadOnly}
                            placeholder='Enter your narrative here'
                            value={incident['description'] || ''}
                            onChange={onChangeHandler} />
                    </label>
                &nbsp;&nbsp;
                    {mode == 'create' &&
                    <p>Save your incident to add<br/> additional affiliated officers.</p>}
                    {mode != 'create' &&
                    <div className='small-table-container'>
                        <label>Affiliated Officers
                            <Table
                                isIncidents='true'
                                isAffiliatedOfficers='true'
                                tableData={otherOfficersTable}
                                onDelete={onDelete}>
                            </Table>
                        </label>
                        {mode == 'edit' && <a href='#' onClick={openPopupHandler}>+ Add an Officer</a>}
                        <PopupWindow 
                            text={'Add an Affiliated Officer'}
                            isVisible={popupOpen}
                            childElement={
                                <Dropdown
                                    backendURL={backendURL}
                                    routePath={'/officers'}
                                    colName='officerID'
                                    displayName1='First Name'
                                    displayName2='Last Name'
                                    onChangeHandler={onPopupChangeHandler}>
                                </Dropdown>
                            }
                            noButtonText={'Cancel'}
                            yesButtonText={'Save'}
                            onNo={onClose}
                            onYes={onSave}
                            itemToSubmit={otherOfficer}
                        ></PopupWindow>
                    </div>}
                </div>
                <br/>
                <br/>
                <div className='update-button'>
                    {mode != 'view' &&
                    <button type='submit'>Save</button>}
                </div>
            </fieldset>
            </form>
        </div>
    );
}

export default IncidentForm;