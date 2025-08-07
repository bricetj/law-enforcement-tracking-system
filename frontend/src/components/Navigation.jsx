/*
 * Brice Jenkins and Andrew Heilesen
 * Copyright: 2025
 */

import { Link } from 'react-router-dom';

/**
 * Renders HTML navigation elements using the Link component from
 * react-router-dom.
 * @returns A React element rendering HTML navigation links.
 */
function Navigation() {
    return (
        <nav className='App-nav'>
            <Link to='/'>Home</Link>
            <Link to='/officers'>Officers</Link>
            <Link to='/incidents'>Incidents</Link>
            <Link to='/vehicles'>Vehicles</Link>
            <Link to='/firearms'>Firearms</Link>
            <Link to='/admin'>Admin</Link>
        </nav>
    );
}

export default Navigation;