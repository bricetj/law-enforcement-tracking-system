/******************************************************************************
    File Name:      LETS_DML.sql
    Description:    A list of data manipulation queries to be used in our
                    application.
    Authors:        Brice Jenkins, Andrew Heilesen [Team 36 - The Officers]
    Class/Section:  CS340 Introduction to Databases
    Assignment:     Project Step 3 - DML
    Date Created:   July 30, 2025
    Last Modified:  August 14, 2025

******************************************************************************/


/**************************************
 *
 * SELECT QUERIES
 *
 **************************************/


--
-- SELECT QUERIES (VEHICLES PAGE): Queries to display data in table on Vehicles page
-- within the application. Also used for dropdowns with vehicle-related info.
--

-- Populate Vehicles page (stored in a view).
SELECT
    Vehicles.vehicleID AS 'ID',
    Vehicles.color AS 'Color',
    Vehicles.year AS 'Year',
    VehicleMakes.make AS 'Make',
    VehicleModels.model AS 'Model',
    Vehicles.licensePlate as 'License Plate',
    Officers.lastName AS 'Assigned Officer',
    IF(Vehicles.isActive = 1, 'Active', 'Inactive') AS 'Active Status'
FROM Vehicles
    JOIN VehicleModels ON Vehicles.vehicleModelID = VehicleModels.vehicleModelID
    JOIN VehicleMakes ON VehicleMakes.vehicleMakeID = VehicleModels.vehicleMakeID
    LEFT JOIN Officers ON Officers.vehicleID = Vehicles.vehicleID
ORDER BY Vehicles.vehicleID ASC;

-- Select a vehicle by ID
SELECT 
	Vehicles.vehicleID AS 'id',
	Vehicles.year AS 'year',
	VehicleModels.vehicleMakeID AS 'makeID',
	Vehicles.vehicleModelID AS 'modelID',
	Vehicles.color AS 'color',
	Vehicles.licensePlate AS 'licensePlate',
	Vehicles.isActive AS 'isActive',
	Officers.officerID AS 'officerID'
FROM Vehicles
JOIN VehicleModels ON Vehicles.vehicleModelID = VehicleModels.vehicleModelID
LEFT JOIN Officers ON Officers.vehicleID = Vehicles.vehicleID
WHERE Vehicles.vehicleID = :idInput;


--
-- SELECT QUERIES (INCIDENTS PAGE): Queries to display data in table on
-- Incidents page within the application. Also contains queries to select and
-- view a single incident on the View Incident page.
--

-- Populate Incidents (stored as a view).
SELECT
    Incidents.incidentID AS 'ID',
    DATE_FORMAT(Incidents.date, '%Y-%m-%d') AS 'Date',
    Officers.lastName AS 'Case Officer',
    IF(Incidents.isActive = 1, 'Active', 'Inactive') AS 'Case Status'
FROM Incidents
    JOIN OfficerIncidents ON Incidents.incidentID = OfficerIncidents.incidentID
    JOIN Officers ON Officers.officerID = OfficerIncidents.officerID
WHERE OfficerIncidents.isCaseOfficer = 1
ORDER BY Incidents.incidentID ASC;

-- Display incident with case officer per ID
SELECT
	Incidents.incidentID AS 'id',
	DATE_FORMAT(Incidents.date, '%Y-%m-%d') AS 'date',
	Incidents.description AS 'description',
	Officers.officerID AS 'officerID',
	Officers.lastName AS 'lastName',
	Incidents.isActive as 'isActive'
FROM Incidents
	JOIN OfficerIncidents ON Incidents.incidentID = OfficerIncidents.incidentID
	JOIN Officers ON Officers.officerID = OfficerIncidents.officerID
WHERE Incidents.incidentID = :idInput AND OfficerIncidents.isCaseOfficer = 1;


--
-- SELECT QUERIES (OFFICERS PAGE): Queries to display data in table on Officers page
-- within the application. Also used for Officer-related dropdowns.
--

-- Populate Officers page (stored as a view).
SELECT 
    officerID AS 'ID',
    firstName AS 'First Name',
    IF(middleName = 'undefined', '', middleName) AS 'Middle Name',
    lastName AS 'Last Name',
    ssn AS 'SSN',
    DATE_FORMAT(dob, '%Y-%m-%d') AS 'Date of Birth',
    IF(address = 'undefined', '', address) AS 'Address',
    IF(email = 'undefined', '', email) AS 'Email',
    IF(isActive = 1, 'Active', 'Inactive') AS 'Active Status'
FROM Officers ORDER BY officerID ASC;

-- Select an Officer By ID
SELECT 
	officerID AS 'id',
	firstName,
	middleName,
	lastName,
	ssn,
	DATE_FORMAT(dob, '%Y-%m-%d') as dob,
	address,
	email,
	isActive
FROM Officers
WHERE officerID = :idInput;


--
-- SELECT QUERIES (OfficerIncidents): Queries to select OfficerIncidents data.
--

-- Gather associated officers per incident (that are not case officers)
SELECT
	Officers.officerID AS 'ID',
	Officers.firstName AS 'firstName',
	Officers.lastName AS 'lastName'
FROM Officers
	JOIN OfficerIncidents ON Officers.officerID = OfficerIncidents.officerID
WHERE OfficerIncidents.incidentID = :idInput AND OfficerIncidents.isCaseOfficer = 0;



--
-- SELECT QUERIES (FIREARMS PAGE): Queries to display data in table on Firearms page within
-- the application, or select a Firearm by ID.
--

-- Populate Firearms page (stored as a view)
SELECT
    Firearms.firearmID AS 'ID',
    Firearms.year AS 'Year',
    FirearmMakes.make AS 'Make',
    FirearmModels.model AS 'Model',
    Officers.lastName AS 'Assigned Officer',
    IF(Firearms.isActive = 1, 'Active', 'Inactive') AS 'Active Status'
FROM Firearms
    JOIN FirearmModels ON Firearms.firearmModelID = FirearmModels.firearmModelID
    JOIN FirearmMakes ON FirearmMakes.firearmMakeID = FirearmModels.firearmMakeID
    LEFT JOIN Officers ON Officers.officerID = Firearms.officerID
ORDER BY Firearms.firearmID ASC;


-- Select a firearm by ID
SELECT 
	firearmID AS 'id',
	year,
	firearmModelID AS 'modelID',
	isActive,
	officerID
FROM Firearms
WHERE firearmID = :idInput;


--
-- SELECT QUERIES (VEHICLE MAKES PAGE): Queries to display data in table on
-- Vehicle Makes page (or for Vehicle Make dropdown) or select a specific Vehicle
-- Make.
-- 

-- Display Vehicle Makes (stored as view)
SELECT
    vehicleMakeID AS 'ID',
    make AS 'Make'
FROM VehicleMakes
ORDER BY vehicleMakeID ASC;


-- Select Vehicle Make by ID
SELECT 
	vehicleMakeID AS 'id',
	make
FROM VehicleMakes
WHERE vehicleMakeID = :idInput;

--
-- SELECT QUERIES (VEHICLE MODELS PAGE): Queries to display data in table on
-- Vehicle Models page or select a model by ID.
--

-- Display Vehicle Models (stored as view)
SELECT
    VehicleModels.vehicleModelID AS 'ID',
    VehicleMakes.make AS 'Make',
    VehicleModels.model AS 'Model'
FROM VehicleModels
    JOIN VehicleMakes ON VehicleModels.vehicleMakeID = VehicleMakes.vehicleMakeID
ORDER BY VehicleModels.vehicleModelID;

-- Select Vehicle Model by ID
SELECT 
	vehicleModelID AS 'id',
	model,
	vehicleMakeID AS 'makeID'
FROM VehicleModels
WHERE vehicleModelID = :idInput;


--
-- SELECT QUERIES (FIREARM MAKES PAGE): Queries to display data in table on
-- Firearm Makes page or select a make by ID.
--

-- Display Firearm Makes (stored as view)
SELECT
    firearmMakeID AS 'ID',
    make AS 'Make'
FROM FirearmMakes
ORDER BY firearmMakeID ASC;

-- Select Firearm Make by ID
SELECT 
	firearmMakeID AS 'id',
	make
FROM FirearmMakes
WHERE firearmMakeID = :idInput;


--
-- DISPLAY QUERIES (FIREARM MODELS PAGE): Queries to display data in table on
-- Firearm Models page or select a model by ID.
-- 

-- Display Firearm Models (stored as a view)
SELECT
    FirearmModels.firearmModelID AS 'ID',
    FirearmMakes.make AS 'Make',
    FirearmModels.model AS 'Model'
FROM FirearmModels
JOIN FirearmMakes ON FirearmModels.firearmMakeID = FirearmMakes.firearmMakeID
ORDER BY FirearmModels.firearmModelID ASC;

-- Select Firearm Model by ID
SELECT 
	firearmModelID AS 'id',
	model,
	firearmMakeID AS 'makeID'
FROM FirearmModels
WHERE firearmModelID = :idInput;




/**************************************
 *
 * INSERTION QUERIES
 *
 **************************************/


-- Insert a new Vehicle into Vehicles.
INSERT INTO Vehicles (year, vehicleModelID, color, licensePlate, isActive)
VALUES (
	:yearInput,
	:vehicle_model_id_from_dropdown_Input,
	:vehicle_color_Input,
	:licensePlateInput,
	:isActiveCheckbox
);

-- Insert a new incident into Incidents. 
INSERT INTO Incidents (date, description, isActive)
VALUES (
	:dateInput,
	:descriptionInput,
	:isActiveInput
);

-- Query to affiliate Officer(s) with Incidents.
INSERT INTO OfficerIncidents (officerID, incidentID, isCaseOfficer)
VALUES (
	:officerIDInput,
	:incidentIDInput,
	:isCaseOfficerInput
);

-- Insert a new Officers.
INSERT INTO Officers (ssn, firstName, middleName, lastName, dob, address, email, isActive)
VALUES (
	:ssnInput,
	:firstNameInput,
	:middleNameInput, 
	:lastNameInput, 
	:dobInput, 
	:addressInput, 
	:emailInput, 
	:isActiveInput
);


/**************************************
 *
 * UPDATE QUERIES
 *
 **************************************/

-- Update Officer information
UPDATE Officers
SET ssn = ssnNew,
	firstName = firstNameNew,
	middleName = middleNameNew,
	lastName = lastNameNew,
	dob = dobNew,
	address = addressNew,
	email = emailNew,
	isActive = isActiveNew
WHERE officerID = officerIDInput;


-- Update incident information
UPDATE Incidents
SET date = dateNew,
	description = descriptionNew,
	isActive = isActiveNew
WHERE incidentID = incidentIDInput;


-- Update an OfficerIncidents record
UPDATE OfficerIncidents
SET officerID = officerIDNew,
	incidentID = incidentIDNew,
	isCaseOfficer = isCaseOfficerNew
WHERE officerID  = officerIDInput AND incidentID = incidentIDInput;


/**************************************
 *
 * DELETION QUERIES
 *
 **************************************/

-- Delete vehicle make
DELETE FROM VehicleMakes
WHERE vehicleMakeID = :vehicle_make_id_from_user_selection;

-- Delete vehicle model
DELETE FROM VehicleModels
WHERE vehicleModelID = :vehicle_model_id_from_user_selection;

-- Delete vehicle
DELETE FROM Vehicles
WHERE vehicleID = :vehicle_id_from_user_selection;

-- Delete incident
DELETE FROM Incidents
WHERE incidentID = :incident_id_from_user_selection;

-- Remove officer from incident
DELETE FROM OfficerIncidents
WHERE officerID = :officer_id_from_user_selection_officer
AND incidentID = :incident_id_from_user_selection_incident;

-- Delete officer
DELETE FROM Officers
WHERE officerID = :officer_id_from_user_selection;

-- Delete firearm
DELETE FROM Firearms
WHERE firearmID = :firearm_id_from_user_selection;

-- Delete firearm model
DELETE FROM FirearmModels
WHERE firearmModelID = :firearm_model_id_from_user_selection;

-- Delete firearm make
DELETE FROM FirearmMakes
WHERE firearmMakeID = :firearm_make_id_from_user_selection;