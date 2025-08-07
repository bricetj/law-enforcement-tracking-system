/*
 * Brice Jenkins and Andrew Heilesen
 * Copyright: 2025
 */

import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Table from '../components/Table';

/**
 * A React page component to display a simplified table of Incidents.
 * @param {string} backendURL The URL used to host the application.
 * Is needed to initiate get requests.
 * @param {function} setIncidentToView Function that is passed
 * down to change value of incidentToView variable when view icon
 * is selected.
 */
function IncidentsPage( {backendURL, setIncidentToView} ) {
    const [incidents, setIncidents] = useState([]);
    const navigate = useNavigate();

    // Calls the 'GET /incidents' endpoint in the REST API.
    const loadIncidents = async () => {
        // Skips data if already fetched.
        if (incidents.length > 0) return;
        try {
            const response = await fetch(backendURL + '/incidents');
            const data = await response.json();
            setIncidents(data);
        } catch (error) {
            console.log (error)
        }
    };

    // Cannot pass an async function to useEffect; however, the anonymous
    // function passed can call loadIncidents().
    useEffect( () => {
        loadIncidents();
    }, []);

    // Will be used to get a particular incidents row to initiate
    // a get request to retrieve more details of the particular incident. 
     const onView = (incident) => {
        setIncidentToView(incident)
        navigate('/view-incident')
    }

    // Calls the Delete route handler.
    const onDelete = async (id) => {
        const response = await fetch(backendURL + `/incidents/${id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setIncidents(incidents.filter( e => e['ID'] !== id))
        } else {
            alert(`Failed to delete incident with id = ${id}, status code = ${response.status}`)
        }
    }

    return (
        <>
            <h2>Incidents</h2>
            <Link
                to='/create-incident'><button className='add-button'>Add Incident</button>
            </Link>
            <div className='table-container'>
                <Table tableData={incidents} onView={onView} isIncidents={true} onDelete={onDelete}></Table>
            </div>
        </>
    );
}

export default IncidentsPage;