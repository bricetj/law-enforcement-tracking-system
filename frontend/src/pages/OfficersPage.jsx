/*
 * Brice Jenkins and Andrew Heilesen
 * Copyright: 2025
 */

import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Table from '../components/Table';

/**
 * A React page component to display a table of Officers.
 * @param {string} backendURL The URL used to host the application.
 * Is needed to initiate get requests.
 * @param {function} setOfficerToEdit Function that is passed
 * down to change value of officerToEdit variable when editing icon
 * is selected.
 */
function OfficersPage( {backendURL, setOfficerToEdit} ) {
    const [officers, setOfficers] = useState([]);
    const navigate = useNavigate();

    // Calls the 'GET /officers' endpoint in the REST API.
    const loadOfficers = async () => {
        if (officers.length > 0) return; // Skip data if already fetched
        try {
            const response = await fetch(backendURL + '/officers');
            const data = await response.json();
            setOfficers(data);
        } catch (error) {
            console.log (error)
        }
    };
    
    useEffect( () => {
        loadOfficers();
    }, []);

    // Calls the 'GET /officers/:id' endpoint in the REST API.
    const loadOfficerByID = async (id) => {
        try {
            const responseOfficer = await fetch(backendURL + `/officers/${id}`);
            const dataOfficer = await responseOfficer.json();
            setOfficerToEdit(dataOfficer[0][0]);
        } catch (error) {
            console.log (error)
        }
    };

    // Will be used to retrieve a particular officer row to pre-populate
    // editing form on CreateOrEditOfficerPage and redirect to that page.
    const onEdit = (officerID) => {
        loadOfficerByID(officerID);
        navigate('/edit-officers')
    }

    // Calls the Delete route handler.
    const onDelete = async (id) => {
        const response = await fetch(backendURL + `/officers/${id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setOfficers(officers.filter( e => e['ID'] !== id))
        } else {
            alert(`Failed to delete officer with id = ${id}, status code = ${response.status}`)
        }
    }

    return (
        <>
            <h2>Officers</h2>
            <Link to='/create-officers'>
                <button className='add-button'>Add Officer</button>
            </Link>
            <div className='table-container'>
                <Table
                    tableData={officers}
                    onEdit={onEdit}
                    onDelete={onDelete}>
                </Table>
            </div>
        </>
    );
}

export default OfficersPage;