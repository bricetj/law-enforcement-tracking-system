import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table.jsx';

function VehiclesPage( {backendURL} ) {
    const [vehicles, setVehicles] = useState([]);

    // Calls the 'GET /vehicles' endpoint in the REST API.
    const loadVehicles = async () => {
        if (vehicles.length > 0) return; // Skip data if already fetched
        try {
            const response = await fetch(backendURL + '/vehicles');
            const data = await response.json();
            setVehicles(data);
        } catch (error) {
            console.log (error)
        }
    };
    // Cannot pass an async function to useEffect; however, the anonymous
    // function passed can call loadVehicles().
    useEffect( () => {
        loadVehicles();
    }, []);

    return (
        <>
            <h2>Vehicles</h2>
            <button className='add-button'>Add Vehicle</button>
            <Table tableData={vehicles}></Table>
        </>
    );
}

export default VehiclesPage;