import OfficerForm from '../components/OfficerForm.jsx';

/**
 * A React page component to display a form for adding or editing Officers
 * objects.
 * @param {string} mode A mode, either 'create' or 'edit'.
 * @param {title} title A string, used to change title of page based on
 * mode.
 * @param {object} officerToEdit An Officers object to be edited.
 */
function CreateOrEditOfficerPage({mode, title, officerToEdit}) {
    return (
        <>
            <h2>{title}</h2>
            <OfficerForm mode={mode} officerToEdit={officerToEdit}></OfficerForm>
        </>
    );
}

export default CreateOrEditOfficerPage;