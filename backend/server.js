// Imports database module for database connection.
const db = require('./database/db-connector');

const MY_ONID = "jenkibri";

// Express library used to create a web server that will listen and respond to API calls from the frontend
const express = require('express');

// Instantiate an express object to interact with the server
const app = express();

// Middleware to allow cross-origin requests
const cors = require('cors');

// Set a port in the range: 1024 < PORT < 65535
const PORT = 4253;


// If on FLIP or classwork, use cors() middleware to allow cross-origin requests from the frontend with your port number:
// EX (local): http://localhost:5173
// EX (FLIP/classwork) http://classwork.engr.oregonstate.edu:5173
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json()); // this is needed for post requests, good thing to know


// Route handler 
app.get('/officers', async (req, res) => {
    try {
        // Define queries
        const query1 = `SELECT officerID AS 'ID', firstName AS 'First Name', middleName AS 'Middle Name',\
                        lastName AS 'Last Name', ssn AS SSN, DATE_FORMAT(dob, '%Y-%m-%d') AS 'Date of Birth',\
                        address AS Address, email AS Email, IF(isActive = 1, 'Active', 'Inactive') AS 'Active Status' \
                        FROM Officers ORDER BY officerID ASC;`;
        
        const [officers] = await db.query(query1);

        // Send back the results in JSON
        res.status(200).json(officers)

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

app.get('/incidents/:id', async (req, res) => {
    const incidentID = req.params.id;
    try {
        // Define queries
        const query1 = `SELECT Incidents.incidentID AS 'ID', DATE_FORMAT(Incidents.date, '%Y-%m-%d') AS 'Date',\
                        Incidents.description AS 'Narrative', Officers.lastName\
                        AS 'Last Name', IF(Incidents.isActive = 1, 'Active', 'Inactive') AS 'Case Status' FROM Incidents\
                        JOIN OfficerIncidents ON Incidents.incidentID = OfficerIncidents.incidentID\
                        JOIN Officers ON Officers.officerID = OfficerIncidents.officerID WHERE Incidents.incidentID = ${incidentID}\
                        AND OfficerIncidents.isCaseOfficer = 1;`;
        // const query2 = `SELECT Officers.lastName AS 'Affiliated Officers' FROM Officers JOIN OfficerIncidents ON\
        //                 Officers.officerID = OfficerIncidents.officerID WHERE OfficerIncidents.incidentID = 2 AND\
        //                 OfficerIncidents.isCaseOfficer = 0;`;
        
        const [incidents] = await db.query(query1);
        // const [officers] = await db.query(query2);

        // Send back the results in JSON
        res.status(200).json(incidents)

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

app.get('/incidents', async (req, res) => {
    try {
        // Define queries
        const query1 = `SELECT Incidents.incidentID AS 'ID', DATE_FORMAT(Incidents.date, '%Y-%m-%d') AS 'Date',\
                        Officers.lastName AS 'Case Officer', IF(Incidents.isActive = 1, 'Active', 'Inactive') AS 'Case Status'\
                        FROM Incidents JOIN OfficerIncidents ON Incidents.incidentID = OfficerIncidents.incidentID JOIN Officers ON \
                        Officers.officerID = OfficerIncidents.officerID WHERE OfficerIncidents.isCaseOfficer = 1\
                        ORDER BY Incidents.incidentID ASC;`;
        
        const [incidents] = await db.query(query1);

        // Send back the results in JSON
        res.status(200).json(incidents)

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

app.get('/vehicles', async (req, res) => {
    try {
        // Define queries
        const query1 = `SELECT Vehicles.vehicleID AS 'ID', Vehicles.color AS 'Color', Vehicles.year AS 'Year',\
                        VehicleMakes.make AS 'Make', VehicleModels.model AS 'Model', Vehicles.licensePlate as 'License Plate',\
                        Officers.lastName AS 'Assigned Officer', IF(Vehicles.isActive = 1, 'Active', 'Inactive') AS 'Active Status' FROM\
                        Vehicles JOIN VehicleModels ON Vehicles.vehicleModelID = VehicleModels.vehicleModelID JOIN VehicleMakes\
                        ON VehicleMakes.vehicleMakeID = VehicleModels.vehicleMakeID LEFT JOIN Officers ON Officers.vehicleID = \
                        Vehicles.vehicleID ORDER BY Vehicles.vehicleID ASC;`;
        
        const [incidents] = await db.query(query1);

        // Send back the results in JSON
        res.status(200).json(incidents)

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

app.get('/firearms', async (req, res) => {
    try {
        // Define queries
        const query1 = `SELECT Firearms.firearmID AS 'ID', Firearms.year AS 'Year', FirearmMakes.make AS 'Make',\
                        FirearmModels.model AS 'Model', Officers.lastName AS 'Assigned Officer', IF(Firearms.isActive = 1, 'Active', 'Inactive')\
                        AS 'Active Status' FROM Firearms JOIN FirearmModels ON Firearms.firearmModelID = FirearmModels.firearmModelID\
                        JOIN FirearmMakes ON FirearmMakes.firearmMakeID = FirearmModels.firearmMakeID LEFT JOIN Officers ON Officers.officerID\
                        = Firearms.officerID ORDER BY Firearms.firearmID ASC;`;
        
        const [incidents] = await db.query(query1);

        // Send back the results in JSON
        res.status(200).json(incidents)

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

app.get('/vehicle-makes', async (req, res) => {
    try {
        // Define queries
        const query1 = `SELECT vehicleMakeID AS 'ID', make AS 'Make' FROM VehicleMakes;`;
        
        const [vehicleMakes] = await db.query(query1);

        // Send back the results in JSON
        res.status(200).json(vehicleMakes)

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

app.get('/vehicle-models', async (req, res) => {
    try {
        // Define queries
        const query1 = `SELECT VehicleModels.vehicleModelID AS 'ID', VehicleMakes.make AS 'Make',\
                        VehicleModels.model AS 'Model' FROM VehicleModels JOIN VehicleMakes ON VehicleModels.vehicleMakeID =\
                        VehicleMakes.vehicleMakeID;`;
        
        const [vehicleMakes] = await db.query(query1);

        // Send back the results in JSON
        res.status(200).json(vehicleMakes)

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

app.get('/firearm-makes', async (req, res) => {
    try {
        // Define queries
        const query1 = `SELECT firearmMakeID AS 'ID', make AS 'Make' FROM FirearmMakes;`;
        
        const [firearmMakes] = await db.query(query1);

        // Send back the results in JSON
        res.status(200).json(firearmMakes)

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

app.get('/firearm-models', async (req, res) => {
    try {
        // Define queries
        const query1 = `SELECT FirearmModels.firearmModelID AS 'ID', FirearmMakes.make AS 'Make',\
                        FirearmModels.model AS 'Model' FROM FirearmModels JOIN FirearmMakes ON FirearmModels.firearmMakeID =\
                        FirearmMakes.firearmMakeID;`;
        
        const [vehicleMakes] = await db.query(query1);

        // Send back the results in JSON
        res.status(200).json(vehicleMakes)

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});


app.delete('/officers/:id', async (req, res) => {
    try {
        const officerId = req.params.id;
        const deleteQuery = `CALL sp_delete_officer(${officerId});`;
        await db.query(deleteQuery);
        res.status(204).send("Delete successful.");
    } catch (error) {
        console.error("Error executing PL/SQL:", error);
            // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the PL/SQL.");
    }
});

app.delete('/incidents/:id', async (req, res) => {
    try {
        const incidentId = req.params.id;
        const deleteQuery = `CALL sp_delete_incident(${incidentId});`;
        await db.query(deleteQuery);
        res.status(204).send("Delete successful.");
    } catch (error) {
        console.error("Error executing PL/SQL:", error);
            // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the PL/SQL.");
    }
});

app.delete('/vehicles/:id', async (req, res) => {
    try {
        const vehicleId = req.params.id;
        const deleteQuery = `CALL sp_delete_vehicle('${vehicleId}');`;
        await db.query(deleteQuery);
        res.status(204).send("Delete successful.");
    } catch (error) {
        console.error("Error executing PL/SQL:", error);
            // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the PL/SQL.");
    }
});


app.delete('/vehicle-makes/:id', async (req, res) => {
    try {
        const vehicleMakeId = req.params.id;
        const deleteQuery = `CALL sp_delete_vehicle_make(${vehicleMakeId});`;
        await db.query(deleteQuery);
        res.status(204).send("Delete successful.");
    } catch (error) {
        console.error("Error executing PL/SQL:", error);
            // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the PL/SQL.");
    }
});


app.delete('/vehicle-models/:id', async (req, res) => {
    try {
        const vehicleModelId = req.params.id;
        const deleteQuery = `CALL sp_delete_vehicle_model(${vehicleModelId});`;
        await db.query(deleteQuery);
        res.status(204).send("Delete successful.");
    } catch (error) {
        console.error("Error executing PL/SQL:", error);
            // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the PL/SQL.");
    }
});


app.delete('/firearms/:id', async (req, res) => {
    try {
        const firearmId = req.params.id;
        const deleteQuery = `CALL sp_delete_firearm('${firearmId}');`;
        await db.query(deleteQuery);
        res.status(204).send("Delete successful.");
    } catch (error) {
        console.error("Error executing PL/SQL:", error);
            // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the PL/SQL.");
    }
});


app.delete('/firearm-makes/:id', async (req, res) => {
    try {
        const firearmMakeId = req.params.id;
        const deleteQuery = `CALL sp_delete_firearm_make(${firearmMakeId});`;
        await db.query(deleteQuery);
        res.status(204).send("Delete successful.");
    } catch (error) {
        console.error("Error executing PL/SQL:", error);
            // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the PL/SQL.");
    }
});



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


app.post('/reset-database', async (req, res) => {
    try {
        const resetSP = `CALL sp_load_lets();`;
        const [reset] = await db.query(resetSP);
        // Send back the results in JSON
        res.status(201).json(reset)

    } catch (error) {
        console.error("Error executing stored procedure:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database stored procedure.");
    }
});


// Tell express what port to listen on 
app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});