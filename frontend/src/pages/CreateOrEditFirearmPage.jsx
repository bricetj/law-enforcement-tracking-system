/*
 * Brice Jenkins and Andrew Heilesen
 * Copyright: 2025
 */

import FirearmForm from '../components/FirearmForm.jsx';

/**
 * A React page component to display a form for adding or editing Firearms
 * objects.
 * @param {string} backendURL The URL used to host the application.
 * Is needed to initiate get requests.
 * @param {string} mode A mode, either 'create' or 'edit'.
 * @param {title} title A string, used to change title of page based on
 * mode.
 * @param {object} firearmToEdit A Firearms object to be edited.
 */
function CreateOrEditFirearmPage({backendURL, mode, title, firearmToEdit}) {
    return (
        <>
            <h2>{title}</h2>
            <FirearmForm 
                backendURL={backendURL}
                mode={mode}
                firearmToEdit={firearmToEdit}>
            </FirearmForm>
        </>
    );
}

export default CreateOrEditFirearmPage;