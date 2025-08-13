/*
 * Brice Jenkins and Andrew Heilesen
 * Copyright: 2025
 */

import { useEffect, useState, useCallback } from 'react';
import Table from '../components/Table';
import ModelForm from '../components/ModelForm';
import PopupWindow from '../components/PopupWindow';

/**
 * A React page component to display a table of VehicleModels.
 * @param {string} backendURL The URL used to host the application.
 * Is needed to initiate get requests.
 * @param {string} modelType Either 'firearms' or 'vehicles' so proper route
 * handler is called.
 */
function VehicleModelsPage({backendURL, modelType}) {
    const [vehicleModels, setVehicleModels] = useState([]);
    const [mode, setMode] = useState('create');
    const [modelToEdit, setModel] = useState();
    const [popupOpen, setPopupOpen] = useState(false);

    // Calls the 'GET /vehicle-models' endpoint in the REST API.
    const loadVehicleModels = async () => {
        try {
            const response = await fetch(backendURL + '/vehicle-models');
            const data = await response.json();
            setVehicleModels(data);
        } catch (error) {
            console.log (error)
        }
    };

    // Cannot pass an async function to useEffect; however, the anonymous
    // function passed can call loadVehicleModels().
    useEffect( () => {
        loadVehicleModels();
    }, []);

    // Will be used to capture a particular VehicleModel row to pre-populate
    // editing form.
    const onEdit = (make) => {
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
        const response = await fetch(backendURL + `/vehicle-models/${id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setVehicleModels(vehicleModels.filter( e => e['ID'] !== id))
        } else {
            alert(`Vehicle model with id = ${id} is currently used by a child asset; status code = ${response.status}`)
        }
    }, [vehicleModels]);

    return (
        <>
            <h2>Vehicle Models</h2>
            <button className='add-button'
                    onClick={newModelHandler}>Add Model</button>
            <PopupWindow
                text={'Add a Vehicle Model'}
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
                    tableData={vehicleModels}
                    onEdit={onEdit}
                    onDelete={onDelete}>
                </Table>
            </div>
        </>
    );
}

export default VehicleModelsPage;