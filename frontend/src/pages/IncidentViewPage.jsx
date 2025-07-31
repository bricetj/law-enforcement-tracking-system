import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table.jsx';

function IncidentViewPage( {backendURL, incidentToView} ) {
    const [incident, setIncident] = useState([]);

    // Calls the 'GET /incidents/:id' endpoint in the REST API.
    const loadIncident = async () => {
        if (incident.length > 0) return; // Skip data if already fetched
        try {
            const response = await fetch(backendURL + `/incidents/${incidentToView['Incident Number']}`);
            const data = await response.json();
            setIncident(data);
        } catch (error) {
            console.log (error)
        }
    };
    // Cannot pass an async function to useEffect; however, the anonymous
    // function passed can call loadIncidents().
    useEffect( () => {
        loadIncident();
    }, []);

    return (
        <>
            <h2>View Incident</h2>
            <button className='add-button'>Edit Incident</button>
            <Table tableData={incident}></Table>
        </>
    );
}

export default IncidentViewPage;