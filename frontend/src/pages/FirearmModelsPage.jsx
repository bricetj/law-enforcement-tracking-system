/*
 * Brice Jenkins and Andrew Heilesen
 * Copyright: 2025
 */

import { useEffect, useState, useCallback } from 'react';
import Table from '../components/Table';
import ModelForm from '../components/ModelForm';
import PopupWindow from '../components/PopupWindow';

/**
 * A React page component to display a table of FirearmModels.
 * @param {string} backendURL The URL used to host the application.
 * Is needed to initiate get requests.
 * @param {string} modelType Either 'firearms' or 'vehicles' so proper route
 * handler is called.
 */
function FirearmModelsPage({backendURL, modelType}) {
    const [firearmModels, setFirearmModels] = useState([]);
    const [mode, setMode] = useState('create');
    const [modelToEdit, setModel] = useState();
    const [popupOpen, setPopupOpen] = useState(false);

    // Calls the 'GET /firearm-models' endpoint in the REST API.
    const loadFirearmModels = async () => {
        try {
            const response = await fetch(backendURL + '/firearm-models');
            const data = await response.json();
            setFirearmModels(data);
        } catch (error) {
            console.log (error)
        }
    };

    // Cannot pass an async function to useEffect; however, the anonymous
    // function passed can call loadFirearmModels().
    useEffect( () => {
        loadFirearmModels();
    }, []);

    // Will be used to capture a particular FirearmModels row to pre-populate
    // editing form.
    const onEdit = (makeID, make) => {
        setMode('edit');
        setModel(make);
        setPopupOpen(true);
    }

    // Handles opening the popup window and clearing the form for new model.
    const newModelHandler = () => {
        setPopupOpen(true);
        setModel('');
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
        const response = await fetch(backendURL + `/firearm-models/${id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setFirearmModels(firearmModels.filter( e => e['ID'] !== id))
        } else {
            alert(`Firearm model with id = ${id} is currently used by a child asset; status code = ${response.status}`)
        }
    }, [firearmModels])

    return (
        <>
            <h2>Firearm Models</h2>
            <button className='add-button' onClick={newModelHandler}>Add Model</button>
            <PopupWindow
                text={'Add a Firearm Model'}
                isVisible={popupOpen}
                childElement={
                    <ModelForm
                        backendURL={backendURL}
                        mode={mode}
                        modelToEdit={modelToEdit}
                        modelType={modelType}>
                    </ModelForm>}
                noButtonText={'Cancel'}
                yesButtonText={'Save'}
                onNo={onClose}
                onYes={onSave}
            ></PopupWindow>
            <div className='table-container'>
                <Table 
                    tableData={firearmModels}
                    onEdit={onEdit}
                    onDelete={onDelete}>
                </Table>
            </div>
        </>
    );
}

export default FirearmModelsPage;