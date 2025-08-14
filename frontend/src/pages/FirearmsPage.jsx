/*
 * Brice Jenkins and Andrew Heilesen
 * Copyright: 2025
 */

import { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Table from '../components/Table';

/**
 * A React page component to display a table of Firearms.
 * @param {string} backendURL The URL used to host the application.
 * Is needed to initiate get requests.
 * @param {function} setFirearmToEdit Function that is passed
 * down to change value of firearmToEdit variable when editing icon
 * is selected.
 */
function FirearmsPage( {backendURL, setFirearmToEdit} ) {
    const [firearms, setFirearms] = useState([]);
    const navigate = useNavigate();

    // Calls the 'GET /firearms' endpoint in the REST API.
    const loadFirearms = async () => {
        try {
            const response = await fetch(backendURL + '/firearms');
            const data = await response.json();
            setFirearms(data);
        } catch (error) {
            console.log (error)
        }
    };
    // Cannot pass an async function to useEffect; however, the anonymous
    // function passed can call loadFirearms().
    useEffect( () => {
        loadFirearms();
    }, []);

    // Calls the 'GET /firearms/:id' endpoint in the REST API.
    const loadFirearmByID = async (id) => {
        try {
            const responseFirearm = await fetch(backendURL + `/firearms/${id}`);
            const dataFirearm = await responseFirearm.json();
            setFirearmToEdit(dataFirearm[0][0]);
        } catch (error) {
            console.log (error);
        }
    };

    // Will be used to capture a particular firearms row to pre-populate
    // editing form on CreateOrEditFirearmPage and redirect to that page.
    const onEdit = (firearmID) => {
        loadFirearmByID(firearmID);
        navigate('/edit-firearm');
    }

    // Calls the Delete route handler.
    const onDelete = useCallback(async (id) => {
        const response = await fetch(backendURL + `/firearms/${id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setFirearms(firearms.filter( e => e['ID'] !== id));
        } else {
            alert(`Failed to delete firearm with id = ${id}, status code = ${response.status}`);
        }
    }, [firearms])

    return (
        <>
            <h2>Firearms</h2>
            <Link to='/create-firearm'>
                <button className='add-button'>Add Firearm</button>
            </Link>
            <div className='table-container'>
                <Table tableData={firearms} onEdit={onEdit} onDelete={onDelete}></Table>
            </div>
        </>
    );
}

export default FirearmsPage;