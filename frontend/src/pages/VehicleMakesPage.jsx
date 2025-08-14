/*
 * Brice Jenkins and Andrew Heilesen
 * Copyright: 2025
 */

import { useEffect, useState, useCallback } from 'react';
import Table from '../components/Table';
import MakeForm from '../components/MakeForm';
import PopupWindow from '../components/PopupWindow';

/**
 * A React page component to display a table of VehicleMakes.
 * @param {string} backendURL The URL used to host the application.
 * Is needed to initiate get requests.
 */
function VehicleMakesPage({backendURL}) {
    const [vehicleMakes, setVehicleMakes] = useState([]);
    const [mode, setMode] = useState('create')
    const [makeToEdit, setMake] = useState();
    const [popupOpen, setPopupOpen] = useState(false);

    // Calls the 'GET /vehicle-makes' endpoint in the REST API.
    const loadVehicleMakes = async () => {
        try {
            const response = await fetch(backendURL + '/vehicle-makes');
            const data = await response.json();
            setVehicleMakes(data);
        } catch (error) {
            console.log (error)
        }
    };

    // Cannot pass an async function to useEffect; however, the anonymous
    // function passed can call loadVehicleMakes().
    useEffect( () => {
        loadVehicleMakes();
    }, []);

    // Will be used to capture a particular VehicleMake row to pre-populate
    // editing form.
    const onEdit = (makeID, make) => {
        setMode('edit');
        setMake(make);
        setPopupOpen(true);
    }

    // Handles opening the popup window and clearing the form for new make.
    const newMakeHandler = () => {
        setPopupOpen(true);
        setMake('');
    }

    // Handles closing the popup window.
    const onClose = () => {
        setPopupOpen(false);
    }

    // Handles saving new information (in development).
    const onSave = () => {
        setPopupOpen(false);
    }

    // Calls the Delete route handler.
    const onDelete = useCallback(async (id) => {
        const response = await fetch(backendURL + `/vehicle-makes/${id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setVehicleMakes(vehicleMakes.filter( e => e['ID'] !== id))
        } else {
            alert(`Vehicle make with id = ${id} is currently used by a child asset; status code = ${response.status}`)
        }
    }, [vehicleMakes])

    return (
        <>
            <h2>Vehicle Makes</h2>
            <button className='add-button' onClick={newMakeHandler}>Add Make</button>
            <PopupWindow
                text={'Add a Vehicle Make'}
                isVisible={popupOpen}
                childElement={
                    <MakeForm
                        mode={mode}
                        makeToEdit={makeToEdit}>
                    </MakeForm>}
                noButtonText={'Cancel'}
                yesButtonText={'Save'}
                onNo={onClose}
                onYes={onSave}
            ></PopupWindow>
            <div className='table-container'>
                <Table
                    tableData={vehicleMakes}
                    onEdit={onEdit}
                    onDelete={onDelete}>
                </Table>
            </div>
        </>
    );
}

export default VehicleMakesPage;