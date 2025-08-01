import { useEffect, useState } from 'react';
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
        // Skips data if already fetched.
        if (firearms.length > 0) return;
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

    // Will be used to capture a particular firearms row to pre-populate
    // editing form on CreateOrEditFirearmPage and redirect to that page.
    const onEdit = (firearm) => {
        setFirearmToEdit(firearm)
        navigate('/edit-firearm')
    }

    return (
        <>
            <h2>Firearms</h2>
            <Link to='/create-firearm'><button className='add-button'>Add Firearm</button></Link>
            <Table tableData={firearms} onEdit={onEdit}></Table>
        </>
    );
}

export default FirearmsPage;