import './App.css';
import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import OfficersPage from './pages/OfficersPage';
import IncidentsPage from './pages/IncidentsPage';
import VehiclesPage from './pages/VehiclesPage';
import FirearmsPage from './pages/FirearmsPage';
import CreateOrEditOfficerPage from './pages/CreateOrEditOfficerPage';
import CreateOrEditVehiclePage from './pages/CreateOrEditVehiclePage';
import AdminPage from './pages/AdminPage';
import CreateOrEditFirearmPage from './pages/CreateOrEditFirearmPage';
import IncidentViewPage from './pages/IncidentViewPage';
import VehicleMakesPage from './pages/VehicleMakesPage';
import VehicleModelsPage from './pages/VehicleModelsPage';
import FirearmMakesPage from './pages/FirearmMakesPage';
import FirearmModelsPage from './pages/FirearmModelsPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Define the backend port and URL for API requests
const backendPort = 4253;  // Use the port you assigned to the backend server, this would normally go in .env file
const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}`;

function App() {
  const [officerToEdit, setOfficerToEdit] = useState();
  const [incidentToView, setIncidentToView] = useState();
  const [vehicleToEdit, setVehicleToEdit] = useState();
  const [firearmToEdit, setFirearmToEdit] = useState();

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
          <Route path='/admin' element={<AdminPage backendURL={backendURL}/>}></Route>
          <Route path='/officers' element={<OfficersPage backendURL={backendURL} setOfficerToEdit={setOfficerToEdit}/>}></Route>
          <Route path='/incidents' element={<IncidentsPage backendURL={backendURL} setIncidentToView={setIncidentToView}/>}></Route>
          <Route path='/vehicles' element={<VehiclesPage backendURL={backendURL} setVehicleToEdit={setVehicleToEdit}/>}></Route>
          <Route path='/firearms' element={<FirearmsPage backendURL={backendURL} setFirearmToEdit={setFirearmToEdit}/>}></Route>
          <Route path='/create-officers' element={<CreateOrEditOfficerPage mode={'create'} title={'Add Officer'}/>}></Route>
          <Route path='/edit-officers' element={<CreateOrEditOfficerPage mode={'edit'} title={'Edit Officer'} officerToEdit={officerToEdit}/>}></Route>
          <Route path='/create-incident' element={<IncidentViewPage pageTitle={'Create Incident'} mode={'create'} backendURL={backendURL}/>}></Route>
          <Route path='/view-incident' element={<IncidentViewPage pageTitle={'View Incident'} mode={'view'} backendURL={backendURL} incidentToView={incidentToView}/>}></Route>
          <Route path='/edit-incident' element={<IncidentViewPage mode={'edit'} backendURL={backendURL} incidentToView={incidentToView}/>}></Route>
          <Route path='/create-vehicle' element={<CreateOrEditVehiclePage mode={'create'} title={'Add Vehicle'}/>}></Route>
          <Route path='/edit-vehicle' element={<CreateOrEditVehiclePage mode={'edit'} title={'Edit Vehicle'} vehicleToEdit={vehicleToEdit}/>}></Route>
          <Route path='/create-firearm' element={<CreateOrEditFirearmPage mode={'create'} title={'Add Firearm'}/>}></Route>
          <Route path='/edit-firearm' element={<CreateOrEditFirearmPage mode={'edit'} title={'Edit Firearm'} firearmToEdit={firearmToEdit}/>}></Route>
          <Route path='/vehicle-makes' element={<VehicleMakesPage backendURL={backendURL}/>}></Route>
          <Route path='/vehicle-models' element={<VehicleModelsPage backendURL={backendURL}/>}></Route>
          <Route path='/firearm-makes' element={<FirearmMakesPage backendURL={backendURL}/>}></Route>
          <Route path='/firearm-models' element={<FirearmModelsPage backendURL={backendURL}/>}></Route>
        </Routes>
      </Router>
      <footer>
        <p>&copy; 2025 Andrew Heilesen and Brice Jenkins</p>
      </footer>  
    </div>
  );

} export default App;