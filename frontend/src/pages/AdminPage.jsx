import { Link } from 'react-router-dom';

/**
 * A React page component to display links for modifying vehicle/firearms
 * makes/models and other admin content (if added later).
 */
function AdminPage() {
    return (
        <>
            <h2>Admin Page</h2>
            <div className='row'>
                <div className='column'>
                    <h3>Vehicle Make/Model Options</h3>
                    <Link to='/vehicle-makes'><p>Modify Vehicle Makes Table</p></Link>
                    <Link to='/vehicle-models'><p>Modify Vehicle Models Table</p></Link>
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