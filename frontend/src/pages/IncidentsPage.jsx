import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table';

function IncidentsPage( {backendURL, setIncidentToView} ) {
    const [incidents, setIncidents] = useState([]);
    const navigate = useNavigate();

    // Calls the 'GET /incidents' endpoint in the REST API.
    const loadIncidents = async () => {
        if (incidents.length > 0) return; // Skip data if already fetched
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

     const onView = (incident) => {
        setIncidentToView(incident)
        navigate('/view-incident')
    }

    return (
        <>
            <h2>Incidents</h2>
            <button className='add-button'>Add Incident</button>
            <Table tableData={incidents} onView={onView} isIncidents={true}></Table>
        </>
    );
}

export default IncidentsPage;