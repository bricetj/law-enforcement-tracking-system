import { useEffect, useState } from 'react';
import Table from '../components/Table';
import ModelForm from '../components/ModelForm';

/**
 * A React page component to display a table of VehicleModels.
 * @param {string} backendURL The URL used to host the application.
 * Is needed to initiate get requests.
 */
function VehicleModelsPage({backendURL}) {
    const [vehicleModels, setVehicleModels] = useState([]);
    const [mode, setMode] = useState('create');
    const [modelToEdit, setModel] = useState();

    // Calls the 'GET /vehicle-models' endpoint in the REST API.
    const loadVehicleModels = async () => {
        // Skip data if already fetched.
        if (vehicleModels.length > 0) return;
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
        setMode('edit')
        setModel(make)
    }

    // Calls the Delete route handler.
    const onDelete = async (id) => {
        const response = await fetch(backendURL + `/vehicle-models/${id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setVehicleModels(vehicleModels.filter( e => e['ID'] !== id))
        } else {
            alert(`Vehicle model with id = ${id} is currently used by a child asset; status code = ${response.status}`)
        }
    }

    return (
        <>
            <h2>Vehicle Models</h2>
            <ModelForm mode={mode} modelToEdit={modelToEdit}></ModelForm>
            <button className='make-model-add-button'>Add Model</button>
            <Table tableData={vehicleModels} onEdit={onEdit} onDelete={onDelete}></Table>
        </>
    );
}

export default VehicleModelsPage;