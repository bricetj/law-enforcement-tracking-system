import './App.css';
import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import OfficersPage from './pages/OfficersPage';
import IncidentsPage from './pages/IncidentsPage';
import VehiclesPage from './pages/VehiclesPage';
import FirearmsPage from './pages/FirearmsPage';
import CreateOrEditOfficerPage from './pages/CreateOrEditOfficerPage';
import IncidentViewPage from './pages/IncidentViewPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Define the backend port and URL for API requests
const backendPort = 4253;  // Use the port you assigned to the backend server, this would normally go in .env file
const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}`;

function App() {
  const [officerToEdit, setOfficerToEdit] = useState();
  const [incidentToView, setIncidentToView] = useState();

  return (
    <div className='app'>
      <header>
        <h1>LETS</h1>
        <p>Law Enforcement Tracking System</p>
      </header>
      <Router>
        <Navigation/>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/officers' element={<OfficersPage backendURL={backendURL} setOfficerToEdit={setOfficerToEdit}/>}></Route>
          <Route path='/incidents' element={<IncidentsPage backendURL={backendURL} setIncidentToView={setIncidentToView}/>}></Route>
          <Route path='/vehicles' element={<VehiclesPage backendURL={backendURL}/>}></Route>
          <Route path='/firearms' element={<FirearmsPage backendURL={backendURL}/>}></Route>
          <Route path='/create-officers' element={<CreateOrEditOfficerPage mode={'create'} title={'Add Officer'}/>}></Route>
          <Route path='/edit-officers' element={<CreateOrEditOfficerPage mode={'edit'} title={'Edit Officer'} officerToEdit={officerToEdit}/>}></Route>
          <Route path='/view-incident' element={<IncidentViewPage backendURL={backendURL} incidentToView={incidentToView}/>}></Route>
        </Routes>
      </Router>
      <footer>
        <p>&copy; 2025 Andrew Heilesen and Brice Jenkins</p>
      </footer>  
    </div>
  );

} export default App;