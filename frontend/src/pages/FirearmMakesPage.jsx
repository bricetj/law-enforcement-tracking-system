/*
 * Brice Jenkins and Andrew Heilesen
 * Copyright: 2025
 */


import { useEffect, useState, useCallback } from 'react';
import Table from '../components/Table';
import MakeForm from '../components/MakeForm';
import PopupWindow from '../components/PopupWindow';

/**
 * A React page component to display a table of FirearmMakes.
 * @param {string} backendURL The URL used to host the application.
 * Is needed to initiate get requests.
 */
function FirearmMakesPage({backendURL}) {
    const [firearmMakes, setFirearmMakes] = useState([]);
    const [mode, setMode] = useState('create')
    const [makeToEdit, setMake] = useState();
    const [popupOpen, setPopupOpen] = useState(false);

    // Calls the 'GET /firearm-makes' endpoint in the REST API.
    const loadFirearmMakes = async () => {
        try {
            const response = await fetch(backendURL + '/firearm-makes');
            const data = await response.json();
            setFirearmMakes(data);
        } catch (error) {
            console.log (error)
        }
    };
    // Cannot pass an async function to useEffect; however, the anonymous
    // function passed can call loadFirearmMakes().
    useEffect( () => {
        loadFirearmMakes();
    }, []);

    // Will be used to capture a particular FirearmMakes row to pre-populate
    // editing form.
    const onEdit = (makeID, make) => {
        setMode('edit')
        setMake(make)
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
        const response = await fetch(backendURL + `/firearm-makes/${id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setFirearmMakes(firearmMakes.filter( e => e['ID'] !== id))
        } else {
            alert(`Firearm make with id = ${id} is currently used by a child asset; status code = ${response.status}`)
        }
    }, [firearmMakes])

    return (
        <>
            <h2>Firearm Makes</h2>
            <button className='add-button' onClick={newMakeHandler}>Add Make</button>
            <PopupWindow
                text={'Add a Firearm Make'}
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
                    tableData={firearmMakes}
                    onEdit={onEdit}
                    onDelete={onDelete}>
                </Table>
            </div>
        </>
    );
}

export default FirearmMakesPage;