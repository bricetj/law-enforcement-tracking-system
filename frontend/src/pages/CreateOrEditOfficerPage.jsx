/*
 * Brice Jenkins and Andrew Heilesen
 * Copyright: 2025
 */

import OfficerForm from '../components/OfficerForm.jsx';

/**
 * A React page component to display a form for adding or editing Officers
 * objects.
 * @param {string} mode A mode, either 'create' or 'edit'.
 * @param {title} title A string, used to change title of page based on
 * mode.
 * @param {object} officerToEdit An Officers object to be edited.
 */
function CreateOrEditOfficerPage({backendURL, mode, title, officerToEdit}) {
    return (
        <>
            <h2>{title}</h2>
            <OfficerForm
                backendURL={backendURL}
                mode={mode}
                officerToEdit={officerToEdit}>
            </OfficerForm>
        </>
    );
}

export default CreateOrEditOfficerPage;