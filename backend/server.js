/*
 * Brice Jenkins and Andrew Heilesen
 * Copyright: 2025
 * 
 * 
 * Citation for the following server code:
 * Date: 7/31/2025
 * Adapted from Canvas starter code on Activity 2 - Connect webapp to database (Individual).
 * Source URL: https://canvas.oregonstate.edu/courses/2007765/assignments/10118865?module_item_id=25664551
 */

// Imports database module for database connection.
const db = require('./database/db-connector');
const MY_ONID = "jenkibri";

// Creates a web server that will listen and respond to API calls.
const express = require('express');

// Instantiates an express object to interact with the server.
const app = express();

// cors() middleware  used to allow cross-origin requests from the frontend with port number.
const cors = require('cors');
const PORT = 4253;
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());


/*
 * POST Route Handlers
 */

// Route handler for creating a new officer record.
app.post('/officers', async (req, res) => {
    const newOfficer = req.body

    const ssn = newOfficer.ssn;
    const firstName = newOfficer.firstName;
    const middleName = newOfficer.middleName;
    const lastName = newOfficer.lastName;
    const dob = newOfficer.dob;
    const address = newOfficer.address;
    const email = newOfficer.email;
    const isActive = newOfficer.isActive;

    try {
        const query1 = `CALL sp_create_officer('${ssn}', '${firstName}', '${middleName}',\
         '${lastName}', '${dob}','${address}','${email}',${isActive});`;

        const [officer] = await db.query(query1);
        res.status(201).json(officer);

    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});


// Route handler for creating a new incident record.
app.post('/incidents', async (req, res) => {
    const newIncident = req.body

    const date = newIncident.date;
    const description = newIncident.description;
    const caseOfficer = newIncident.officerID;
    const isActive = newIncident.isActive;

    try {
        const query1 = `CALL sp_create_incident('${date}', '${description}', '${caseOfficer}', ${isActive});`;

        const [incident] = await db.query(query1);
        res.status(201).json(incident);

    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

// Route handler for creating a new vehicle record.
app.post('/vehicles', async (req, res) => {
    const newVehicle = req.body

    const id = newVehicle.id;
    const year = newVehicle.year;
    const modelID = newVehicle.modelID;
    const color = newVehicle.color;
    const licensePlate = newVehicle.licensePlate;
    const isActive = newVehicle.isActive;

    try {
        const query1 = `CALL sp_create_vehicle('${id}', ${year}, ${modelID},\
         '${color}', '${licensePlate}',${isActive});`;

        const [vehicle] = await db.query(query1);
        res.status(201).json(vehicle);

    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

// Route handler for creating a new officer incidents record.
app.post('/affiliated-officers', async (req, res) => {
    const newAffiliatedOfficer = req.body

    const officerID = newAffiliatedOfficer.officerID;
    const incidentID = newAffiliatedOfficer.incidentID;
    const isCaseOfficer = newAffiliatedOfficer.isCaseOfficer;

    try {
        const query1 = `CALL sp_create_officer_incident_record(${officerID}, ${incidentID}, ${isCaseOfficer});`;

        const [affiliatedOfficer] = await db.query(query1);
        res.status(201).json(affiliatedOfficer);

    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

/*
 * GET Route Handlers
 */


// Route handler for retrieving all officers.
app.get('/officers', async (req, res) => {
    try {
        const query1 = `SELECT * FROM view_officers;`;
        
        const [officers] = await db.query(query1);
        res.status(200).json(officers);

    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

// Route handler for retrieving an officer by ID.
app.get('/officers/:id', async (req, res) => {
    const officerID = req.params.id;

    try {
        const query1 = `CALL sp_select_officer_by_id(${officerID})`;
        
        const [officer] = await db.query(query1);
        res.status(200).json(officer);

    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

// Route handler for retrieving incidents.
app.get('/incidents', async (req, res) => {
    try {
        // Define queries
        const query1 = `SELECT * FROM view_incidents;`
        
        const [incidents] = await db.query(query1);
        res.status(200).json(incidents);

    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});


// Route handler for retrieving incidents by ID.
app.get('/incidents/:id', async (req, res) => {
    const incidentID = req.params.id;
    try {
        // Query 1 retrieves data about a particular incident.
        const query1 = `CALL sp_select_incident_by_id(${incidentID});`;

        // Query 2 retrieves data about officers affiliated with an incident.
        const query2 = `CALL sp_select_other_officers_by_incident_id(${incidentID});`;
        
        const [[incidents]] = await db.query(query1);
        const [[officers]] = await db.query(query2);

        // Sends back the results in JSON as array.
        res.status(200).json([incidents, officers]);

    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});


// Route handler for retrieving affiliated officers by incident ID.
app.get('/affiliated-officers/:id', async (req, res) => {
    const incidentID = req.params.id;
    try {
        const query1 = `CALL sp_select_other_officers_by_incident_id(${incidentID});`;
        
        const [[officers]] = await db.query(query1);

        // Sends back the results in JSON as array.
        res.status(200).json(officers);

    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});


// Route handler for retrieving vehicles.
app.get('/vehicles', async (req, res) => {
    try {
        const query1 = `SELECT * FROM view_vehicles;`;
        
        const [vehicles] = await db.query(query1);
        res.status(200).json(vehicles);

    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

// Route handler for retrieving an officer by ID.
app.get('/vehicles/:id', async (req, res) => {
    const vehicleID = req.params.id;

    try {
        const query1 = `CALL sp_select_vehicle_by_id('${vehicleID}')`;
        
        const [vehicle] = await db.query(query1);
        res.status(200).json(vehicle);

    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});


// Route handler for retrieving firearms.
app.get('/firearms', async (req, res) => {
    try {
        const query1 = `SELECT * FROM view_firearms;`;
        
        const [firearms] = await db.query(query1);
        res.status(200).json(firearms);

    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});


// Route handler for retrieving vehicle makes.
app.get('/vehicle-makes', async (req, res) => {
    try {
        const query1 = `SELECT * FROM view_vehicle_makes;`;

        const [vehicleMakes] = await db.query(query1);
        res.status(200).json(vehicleMakes);

    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

// Route handler for retrieving vehicle models.
app.get('/vehicle-models', async (req, res) => {
    try {
        const query1 = `SELECT * FROM view_vehicle_models;`;
        
        const [vehicleModels] = await db.query(query1);
        res.status(200).json(vehicleModels);

    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

// Route handler for retrieving firearm makes.
app.get('/firearm-makes', async (req, res) => {
    try {
        const query1 = `SELECT * FROM view_firearm_makes;`;
        
        const [firearmMakes] = await db.query(query1);
        res.status(200).json(firearmMakes)

    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

// Route handler for retrieving firearm models.
app.get('/firearm-models', async (req, res) => {
    try {
        const query1 = `SELECT * FROM view_firearm_models;`;
        
        const [firearmModels] = await db.query(query1);
        res.status(200).json(firearmModels)

    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});


/*
 * PUT Route Handlers
 */

// Route handler for updating an officer record.
app.put('/officers/:id', async (req, res) => {
    const officerID = req.params.id;
    const officerData = req.body

    const ssn = officerData.ssn;
    const firstName = officerData.firstName;
    const middleName = officerData.middleName;
    const lastName = officerData.lastName;
    const dob = officerData.dob;
    const address = officerData.address;
    const email = officerData.email;
    const isActive = officerData.isActive;

    try {
        const query1 = `CALL sp_update_officer(${officerID}, '${ssn}', '${firstName}', '${middleName}',\
         '${lastName}', '${dob}','${address}','${email}',${isActive});`;

        const [officer] = await db.query(query1);
        res.status(200).json(officer);

    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

app.put('/incidents/:id', async (req, res) => {
    const incidentID = req.params.id;
    const incidentData = req.body

    const date = incidentData.date;
    const description = incidentData.description;
    const isActive = incidentData.isActive;

    try {
        const query1 = `CALL sp_update_incident('${incidentID}', '${date}', "${description}", ${isActive});`;

        const [incident] = await db.query(query1);
        res.status(200).json(incident);

    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

app.put('/affiliated-officers/:id1/:id2', async (req, res) => {
    const offID = req.params.id1;
    const incidentID = req.params.id2;

    const officerIncidentData = req.body

    const newOfficerID = officerIncidentData.officerID;
    const newIncidentID = officerIncidentData.incidentID;
    const isCaseOfficer = officerIncidentData.isCaseOfficer;

    try {
        const query1 = `CALL sp_update_officer_incident(${offID}, ${incidentID}, ${newOfficerID}, ${newIncidentID}, ${isCaseOfficer});`;

        const [officerIncident] = await db.query(query1);
        res.status(200).json(officerIncident);

    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});


// Route handler for running stored procedure to reset database.
app.post('/reset-database', async (req, res) => {
    try {
        const resetSP = `CALL sp_load_lets();`;
        const [reset] = await db.query(resetSP);
        res.status(201).json(reset)

    } catch (error) {
        console.error("Error executing stored procedure:", error);
        res.status(500).send("An error occurred while executing the database stored procedure.");
    }
});


/*
 * DELETE Route Handlers
 */

// Route handler for deleting officers by ID.
app.delete('/officers/:id', async (req, res) => {
    try {
        const officerId = req.params.id;
        // Calls stored procedure.
        const deleteQuery = `CALL sp_delete_officer(${officerId});`;
        await db.query(deleteQuery);
        res.status(204).send("Delete successful.");

    } catch (error) {
        console.error("Error executing PL/SQL:", error);
        res.status(500).send("An error occurred while executing the PL/SQL.");
    }
});


// Route handler for deleting incidents by ID.
app.delete('/incidents/:id', async (req, res) => {
    try {
        const incidentId = req.params.id;
        const deleteQuery = `CALL sp_delete_incident(${incidentId});`;
        await db.query(deleteQuery);
        res.status(204).send("Delete successful.");

    } catch (error) {
        console.error("Error executing PL/SQL:", error);
        res.status(500).send("An error occurred while executing the PL/SQL.");
    }
});


// Route handler for deleting vehicles by ID.
app.delete('/vehicles/:id', async (req, res) => {
    try {
        const vehicleId = req.params.id;
        const deleteQuery = `CALL sp_delete_vehicle('${vehicleId}');`;
        await db.query(deleteQuery);
        res.status(204).send("Delete successful.");

    } catch (error) {
        console.error("Error executing PL/SQL:", error);
        res.status(500).send("An error occurred while executing the PL/SQL.");
    }
});


// Route handler for deleting vehicle makes by ID.
app.delete('/vehicle-makes/:id', async (req, res) => {
    try {
        const vehicleMakeId = req.params.id;
        const deleteQuery = `CALL sp_delete_vehicle_make(${vehicleMakeId});`;
        await db.query(deleteQuery);
        res.status(204).send("Delete successful.");

    } catch (error) {
        console.error("Error executing PL/SQL:", error);
        res.status(500).send("An error occurred while executing the PL/SQL.");
    }
});


// Route handler for deleting vehicle models by ID.
app.delete('/vehicle-models/:id', async (req, res) => {
    try {
        const vehicleModelId = req.params.id;
        const deleteQuery = `CALL sp_delete_vehicle_model(${vehicleModelId});`;
        await db.query(deleteQuery);
        res.status(204).send("Delete successful.");

    } catch (error) {
        console.error("Error executing PL/SQL:", error);
        res.status(500).send("An error occurred while executing the PL/SQL.");
    }
});


// Route handler for deleting firearms by ID.
app.delete('/firearms/:id', async (req, res) => {
    try {
        const firearmId = req.params.id;
        const deleteQuery = `CALL sp_delete_firearm('${firearmId}');`;
        await db.query(deleteQuery);
        res.status(204).send("Delete successful.");

    } catch (error) {
        console.error("Error executing PL/SQL:", error);
        res.status(500).send("An error occurred while executing the PL/SQL.");
    }
});


// Route handler for deleting firearm makes by ID.
app.delete('/firearm-makes/:id', async (req, res) => {
    try {
        const firearmMakeId = req.params.id;
        const deleteQuery = `CALL sp_delete_firearm_make(${firearmMakeId});`;
        await db.query(deleteQuery);
        res.status(204).send("Delete successful.");

    } catch (error) {
        console.error("Error executing PL/SQL:", error);
        res.status(500).send("An error occurred while executing the PL/SQL.");
    }
});


// Route handler for deleting firearm models by ID.
app.delete('/firearm-models/:id', async (req, res) => {
    try {
        const firearmModelId = req.params.id;
        const deleteQuery = `CALL sp_delete_firearm_model(${firearmModelId});`;
        await db.query(deleteQuery);
        res.status(204).send("Delete successful.");
    } catch (error) {
        console.error("Error executing PL/SQL:", error);
            // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the PL/SQL.");
    }
});


// Route handler for deleting OfficerIncidents records by IDs.
app.delete('/incidents/officers/:id1/:id2', async (req, res) => {
    officerID = req.params.id1
    incidentID = req.params.id2
    try {
        const deleteQuery = `CALL sp_delete_affiliated_officer(${officerID}, ${incidentID});`;
        await db.query(deleteQuery);
        res.status(204).send("Delete successful.");

    } catch (error) {
        console.error("Error executing PL/SQL:", error);
        res.status(500).send("An error occurred while executing the PL/SQL.");
    }
});


// Tell express what port to listen on 
app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});