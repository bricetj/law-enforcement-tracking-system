/*
 * Brice Jenkins and Andrew Heilesen
 * Copyright: 2025
 */

import { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Table from '../components/Table.jsx';

/**
 * A React page component to display a table of Vehicles.
 * @param {string} backendURL The URL used to host the application.
 * Is needed to initiate get requests.
 * @param {function} setVehicleToEdit Function that is passed
 * down to change value of vehicleToEdit variable when editing icon
 * is selected.
 */
function VehiclesPage( {backendURL, setVehicleToEdit} ) {
    const [vehicles, setVehicles] = useState([]);
    const navigate = useNavigate();

    // Calls the 'GET /vehicles' endpoint in the REST API.
    const loadVehicles = async () => {
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

    // Calls the 'GET /vehicles/:id' endpoint in the REST API.
    const loadVehicleByID = async (id) => {
        try {
            const responseVehicle = await fetch(backendURL + `/vehicles/${id}`);
            const dataVehicle = await responseVehicle.json();
            setVehicleToEdit(dataVehicle[0][0]);
        } catch (error) {
            console.log (error)
        }
    };

    // Will be used to capture a particular vehicle row to pre-populate
    // editing form on CreateOrEditVehiclePage and redirect to that page.
    const onEdit = (vehicleID) => {
        loadVehicleByID(vehicleID);
        navigate('/edit-vehicle');
    }

    // Calls the Delete route handler.
    const onDelete = useCallback(async (id) => {
        const response = await fetch(backendURL + `/vehicles/${id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setVehicles(vehicles.filter( e => e['ID'] !== id))
        } else {
            alert(`Failed to delete vehicle with id = ${id}, status code = ${response.status}`)
        }
    }, [vehicles]);

    return (
        <>
            <h2>Vehicles</h2>
            <Link to='/create-vehicle'>
                <button className='add-button'>Add Vehicle</button>
            </Link>
            <div className='table-container'>
                <Table
                    tableData={vehicles}
                    onEdit={onEdit}
                    onDelete={onDelete}>
                </Table>
            </div>
        </>
    );
}

export default VehiclesPage;