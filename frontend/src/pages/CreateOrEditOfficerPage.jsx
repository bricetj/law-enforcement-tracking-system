import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OfficerForm from '../components/OfficerForm.jsx';

function CreateOrEditOfficerPage({mode, title, officerToEdit}) {

    return (
        <>
            <h2>{title}</h2>
            <OfficerForm mode={mode} officerToEdit={officerToEdit}></OfficerForm>
        </>
    );
}

export default CreateOrEditOfficerPage;