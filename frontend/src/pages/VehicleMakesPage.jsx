import { useEffect, useState } from 'react';
import Table from '../components/Table';
import MakeForm from '../components/MakeForm';

/**
 * A React page component to display a table of VehicleMakes.
 * @param {string} backendURL The URL used to host the application.
 * Is needed to initiate get requests.
 */
function VehicleMakesPage({backendURL}) {
    const [vehicleMakes, setVehicleMakes] = useState([]);
    const [mode, setMode] = useState('create')
    const [makeToEdit, setMake] = useState()

    // Calls the 'GET /vehicle-makes' endpoint in the REST API.
    const loadVehicleMakes = async () => {
        // Skip data if already fetched.
        if (vehicleMakes.length > 0) return;
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
    const onEdit = (make) => {
        setMode('edit')
        setMake(make)
    }

    // Calls the Delete route handler.
    const onDelete = async (id) => {
        const response = await fetch(backendURL + `/vehicle-makes/${id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setVehicleMakes(vehicleMakes.filter( e => e['ID'] !== id))
        } else {
            alert(`Vehicle make with id = ${id} is currently used by a child asset; status code = ${response.status}`)
        }
    }

    return (
        <>
            <h2>Vehicle Makes</h2>
            <MakeForm mode={mode} makeToEdit={makeToEdit}></MakeForm>
            <button className='make-model-add-button'>Add Make</button>
            <Table tableData={vehicleMakes} onEdit={onEdit} onDelete={onDelete}></Table>
        </>
    );
}

export default VehicleMakesPage;