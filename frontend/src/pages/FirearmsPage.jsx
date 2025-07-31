import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table';

function FirearmsPage( {backendURL} ) {
    const [firearms, setFirearms] = useState([]);

    // Calls the 'GET /firearms' endpoint in the REST API.
    const loadFirearms = async () => {
        if (firearms.length > 0) return; // Skip data if already fetched
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

    return (
        <>
            <h2>Firearms</h2>
            <button className='add-button'>Add Firearm</button>
            <Table tableData={firearms}></Table>
        </>
    );
}

export default FirearmsPage;