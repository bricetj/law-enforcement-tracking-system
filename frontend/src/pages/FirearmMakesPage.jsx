import { useEffect, useState } from 'react';
import Table from '../components/Table';
import MakeForm from '../components/MakeForm';

/**
 * A React page component to display a table of FirearmMakes.
 * @param {string} backendURL The URL used to host the application.
 * Is needed to initiate get requests.
 */
function FirearmMakesPage({backendURL}) {
    const [firearmMakes, setFirearmMakes] = useState([]);
    const [mode, setMode] = useState('create')
    const [makeToEdit, setMake] = useState()

    // Calls the 'GET /firearm-makes' endpoint in the REST API.
    const loadFirearmMakes = async () => {
        // Skips data if already fetched.
        if (firearmMakes.length > 0) return;
        try {
            const response = await fetch(backendURL + '/firearm-makes');
            const data = await response.json();
            setFirearmMakes(data);
        } catch (error) {
            console.log (error)
        }
    };
    // Cannot pass an async function to useEffect; however, the anonymous
    // function passed can call loadFirearmMakes().
    useEffect( () => {
        loadFirearmMakes();
    }, []);

    // Will be used to capture a particular FirearmMakes row to pre-populate
    // editing form.
    const onEdit = (make) => {
        setMode('edit')
        setMake(make)
    }

    return (
        <>
            <h2>Firearm Makes</h2>
            <MakeForm mode={mode} makeToEdit={makeToEdit}></MakeForm>
            <button className='make-model-add-button'>Add Make</button>
            <Table tableData={firearmMakes} onEdit={onEdit}></Table>
        </>
    );
}

export default FirearmMakesPage;