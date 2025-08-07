import VehicleForm from '../components/VehicleForm.jsx';

/**
 * A React page component to display a form for adding or editing Vehicles
 * objects.
 * @param {string} mode A mode, either 'create' or 'edit'.
 * @param {title} title A string, used to change title of page based on
 * mode.
 * @param {object} vehicleToEdit A Vehicles object to be edited.
 */
function CreateOrEditVehiclePage({backendURL, mode, title, vehicleToEdit}) {
    return (
        <>
            <h2>{title}</h2>
            <VehicleForm backendURL={backendURL} mode={mode} vehicleToEdit={vehicleToEdit}></VehicleForm>
        </>
    );
}

export default CreateOrEditVehiclePage;