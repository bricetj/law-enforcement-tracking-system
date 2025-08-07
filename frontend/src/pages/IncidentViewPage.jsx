import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import IncidentForm from '../components/IncidentForm.jsx';

/**
 * A React page component to display a form prepopulatd with a single
 * incident.
 * @param {string} pageTitle A string that changes based on editing or
 * viewing the incident.
 * @param {string} mode A string, either 'edit', 'create', or 'view'.
 * @param {string} backendURL The URL used to host the application.
 * Is needed to initiate get requests.
 * @param {function} incidentToView An incident object to be viewed or
 * edited.
 */
function IncidentViewPage( {pageTitle, mode, backendURL, incidentToView} ) {
    const [incident, setIncident] = useState({});
    const [title, setTitle] = useState(pageTitle);
    const [isVisible, setIsVisible] = useState(true);
    const navigate = useNavigate();

    // Calls the 'GET /incidents/:id' endpoint in the REST API.
    const loadIncident = async () => {
        // Skips data if already fetched.
        if (incident.length > 0) return;
        try {
            const response = await fetch(backendURL + `/incidents/${incidentToView['ID']}`);
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

    // Initiated when Edit Incident button is pressed.
    const editTitleHandler = (title) => {
        setTitle('Edit Incident')
        setIsVisible(false)
    }

    // Sets the page back to View and makes the edit button reappear.
    const editButtonHandler = () => {
        setIsVisible(true)
        setTitle('View Incident')
        navigate('/view-incident')
    }

    return (
        <>
            <h2>{title}</h2>
            <Link to='/edit-incident'>{mode !=='create' && isVisible && <button onClick={editTitleHandler} className='add-button'>Edit Incident</button>}</Link>
            <IncidentForm backendURL={backendURL} mode={mode} incidentData={incident[0]} otherOfficers={incident[1]} editButtonHandler={editButtonHandler}></IncidentForm>
        </>
    );
}

export default IncidentViewPage;