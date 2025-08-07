/*
 * Brice Jenkins and Andrew Heilesen
 * Copyright: 2025
 */

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PopupWindow from '../components/PopupWindow';


/**
 * A React page component to display links for modifying vehicle/firearms
 * makes/models, reset site data, and other admin content (if added later).
 * @param {string} backendURL The URL used to host the application.
 * Is needed to initiate get requests.
 */
function AdminPage({backendURL}) {
    const [popupOpen, setPopupOpen] = useState(false);
    const navigate = useNavigate();


    // Calls the 'POST /reset-database' endpoint in the REST API.
    const resetSite = async () => {
        const response = await fetch(backendURL + '/reset-database', {
                    method: 'POST',
                    headers: {'Content-type': 'application/json'}
                }
        );
        // User is alerted if database is successfully reset and then is
        // redirected to the homescreen.
        if(response.status === 201){
                alert('The database was successfully reset.');
            } else {
                alert('Failed to reset database, status code = ' + response.status);
            };
        navigate('/')
    };

    // Handles opening the reset popup window.
    const openPopupHandler = () => {
        setPopupOpen(true);
    }

    // Handles closing the reset popup window.
    const onClose = () => {
        setPopupOpen(false);
    }

    // Handles resetting site data.
    const onReset = () => {
        setPopupOpen(false);
        resetSite();
    }

    return (
        <>
            <h2>Admin Page</h2>
            <div className='row'>
                <div className='column'>
                    <h3>Vehicle Make/Model Options</h3>
                    <Link to='/vehicle-makes'><p>Modify Vehicle Makes Table</p></Link>
                    <Link to='/vehicle-models'><p>Modify Vehicle Models Table</p></Link>
                    <br/>
                    <br/>
                    <h3>Reset Default Data</h3>
                    <a href='#' onClick={openPopupHandler}>Reset Site Data</a>
                    <PopupWindow text={'Are you sure you want to reset the site data?'}
                                 isVisible={popupOpen}
                                 noButtonText={'No'}
                                 yesButtonText={'Yes'}
                                 onNo={onClose}
                                 onYes={onReset}

                    ></PopupWindow>
                </div>
                <div className='column'>
                    <h3>Firearm Make/Model Options</h3>
                    <Link to='/firearm-makes'><p>Modify Firearm Makes Table</p></Link>
                    <Link to='/firearm-models'><p>Modify Firearm Models Table</p></Link>
                </div>
            </div>
        </>
    );
}

export default AdminPage;