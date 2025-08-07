import { useEffect, useState } from 'react';
import Table from '../components/Table';
import ModelForm from '../components/ModelForm';

/**
 * A React page component to display a table of FirearmModels.
 * @param {string} backendURL The URL used to host the application.
 * Is needed to initiate get requests.
 */
function FirearmModelsPage({backendURL, modelType}) {
    const [firearmModels, setFirearmModels] = useState([]);
    const [mode, setMode] = useState('create');
    const [modelToEdit, setModel] = useState();

    // Calls the 'GET /firearm-models' endpoint in the REST API.
    const loadFirearmModels = async () => {
        // Skips data if already fetched.
        if (firearmModels.length > 0) return;
        try {
            const response = await fetch(backendURL + '/firearm-models');
            const data = await response.json();
            setFirearmModels(data);
        } catch (error) {
            console.log (error)
        }
    };

    // Cannot pass an async function to useEffect; however, the anonymous
    // function passed can call loadFirearmModels().
    useEffect( () => {
        loadFirearmModels();
    }, []);

    // Will be used to capture a particular FirearmModels row to pre-populate
    // editing form.
    const onEdit = (make) => {
        setMode('edit')
        setModel(make)
    }

    // Calls the Delete route handler.
    const onDelete = async (id) => {
        const response = await fetch(backendURL + `/firearm-models/${id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setFirearmModels(firearmModels.filter( e => e['ID'] !== id))
        } else {
            alert(`Firearm model with id = ${id} is currently used by a child asset; status code = ${response.status}`)
        }
    }

    return (
        <>
            <h2>Firearm Models</h2>
            <ModelForm backendURL={backendURL} mode={mode} modelToEdit={modelToEdit} modelType={modelType}></ModelForm>
            <button className='make-model-add-button'>Add Model</button>
            <div className='table-container'>
                <Table tableData={firearmModels} onEdit={onEdit} onDelete={onDelete}></Table>
            </div>
        </>
    );
}

export default FirearmModelsPage;