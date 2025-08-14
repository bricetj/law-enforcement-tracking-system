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

--
-- DROPDOWN SELECT QUERIES: Queries to be used when creating dropdowns
-- selectors throughout the application.
--


-- Dropdown for all vehicle makes
SELECT vehicleMakeID, make
FROM VehicleMakes;

-- Dropdown for all vehicle models
SELECT vehicleModelID, model
FROM VehicleModels;

-- Dropdown for all vehicles
SELECT vehicleID, make, model
FROM Vehicles
	JOIN VehicleModels ON Vehicles.vehicleModelID = VehicleModels.vehicleModelID
	JOIN VehicleMakes ON VehicleModels.vehicleMakeID = VehicleMakes.vehicleMakeID;

-- Dropdown for all vehicles (status = active)
SELECT vehicleID, make, model
FROM Vehicles
	JOIN VehicleModels ON Vehicles.vehicleModelID = VehicleModels.vehicleModelID
	JOIN VehicleMakes ON VehicleModels.vehicleMakeID = VehicleMakes.vehicleMakeID
WHERE Vehicles.isActive = 1;

-- Dropdown for all incidents
SELECT incidentID
FROM Incidents;

-- Dropdown for all incidents (status = active)
SELECT incidentID
FROM Incidents
WHERE Incidents.isActive = 1;

-- Dropdown for all officers associated with incident
SELECT officerID, firstName, LastName
FROM Officers
	JOIN OfficerIncidents ON Officers.officerID = OfficerIncidents.officerID
	JOIN Incidents ON OfficerIncidents.incidentID = Incidents.incidentID
WHERE Officers.officerID = :officer_id_from_user_nput;

-- Dropdown for all officers
SELECT officerID, firstName, LastName
FROM Officers;

-- Dropdown for all officers (status = active)
SELECT officerID, firstName, LastName
FROM Officers
WHERE Officers.isActive = 1;

-- Dropdown for all firearms
SELECT firearmID, make, model
FROM Firearms
	JOIN FirearmModels ON Firearms.firearmModelID = FirearmModels.firearmModelID
	JOIN FirearmMakes ON FirearmModels.firearmMakeID = FirearmMakes.firearmMakeID;

-- Dropdown for all firearm models
SELECT firearmModelID, model
FROM FirearmModels;

-- Dropdown for all firearm makes
SELECT firearmMakeID, make
FROM FirearmMakes;


--
-- DISPLAY/UPDATE QUERIES (VEHICLES PAGE): Queries to display/filter data in table on
-- Vehicles page within the application. Also contains queries to update Vehicle info.
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

-- Update vehicle model
UPDATE Vehicles
SET
	vehicleModelID = :vehicle_model_id_from_dropdown_input
WHERE vehicleID = :vehicle_id_from_dropdown_input;

-- Update vehicle color
UPDATE Vehicles
SET
	color = :vehicle_color_from_dropdown_input
WHERE vehicleID = :vehicle_id_from_dropdown_input;

-- Update vehicle license plate
UPDATE Vehicles
SET
	licensePloate = :licensePlateInput
WHERE vehicleID = :vehicle_id_from_dropdown_input;

-- Update vehicle active status
UPDATE Vehicles
SET
	isActive = :isActiveCheckbox
WHERE vehicleID = :vehicle_id_from_dropdown_input;


--
-- DISPLAY/UPDATE QUERIES (INCIDENTS PAGE): Queries to display/filter data in table on
-- Incidents page within the application. Also contains queries to update Incident info.
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

-- Update incident information
UPDATE Incidents
SET date = dateNew,
	description = descriptionNew,
	isActive = isActiveNew
WHERE incidentID = incidentIDInput;


--
-- DISPLAY/UPDATE QUERIES (OFFICERS PAGE): Queries to display/filter data in table on
-- Officers page within the application. Also contains queries to update Officer info.
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

-- Update Officer vehicle
UPDATE Officer
SET
	vehicleID = :vehicle_id_from_dropdown_Input
WHERE officerID = :officer_id_from_dropdown_Input;


--
-- DISPLAY/UPDATE QUERIES (OFFICER/INCIDENTS): Queries to select and update
-- OfficerIncidents data.
--

-- Gather associated officers per incident (that are not case officers)
SELECT
	Officers.officerID AS 'ID',
	Officers.firstName AS 'firstName',
	Officers.lastName AS 'lastName'
FROM Officers
	JOIN OfficerIncidents ON Officers.officerID = OfficerIncidents.officerID
WHERE OfficerIncidents.incidentID = :idInput AND OfficerIncidents.isCaseOfficer = 0;

-- Update an OfficerIncidents record
UPDATE OfficerIncidents
SET officerID = officerIDNew,
	incidentID = incidentIDNew,
	isCaseOfficer = isCaseOfficerNew
WHERE officerID  = officerIDInput AND incidentID = incidentIDInput;

--
-- DISPLAY/UPDATE QUERIES (FIREARMS PAGE): Queries to display/filter data in table on
-- Firearms page within the application. Also contains queries to update Firearms info.
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

-- Update firearm officer
UPDATE Firearms
SET
	officerID = :officer_id_from_dropdown_Input
WHERE firearmID = :firearm_id_from_dropdown_Input;


--
-- DISPLAY QUERIES (VEHICLE MAKES PAGE): Queries to display data in table on
-- Vehicle Makes page.

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
-- DISPLAY QUERIES (VEHICLE MODELS PAGE): Queries to display data in table on
-- Vehicle Models page.

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
-- DISPLAY QUERIES (FIREARM MAKES PAGE): Queries to display data in table on
-- Firearm Makes page.

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
-- Firearm Models page.

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


--
-- INSERTION QUERIES: For all entities within the application
--

-- Insert a new make into VehicleMakes.
INSERT INTO VehicleMakes (make)
VALUES (
	:makeInput
);

-- Insert a new model into VehicleModels that is affiliated with a preexisting
-- make.
INSERT INTO VehicleModels (mode, vehicleMakeID)
VALUES (
	:modelInput,
	:vehicle_make_id_from_dropdown_Input
);

-- Insert a new Vehicle into Vehicles.
INSERT INTO Vehicles (year, vehicleModelID, color, licensePlate, isActive)
VALUES (
	:yearInput,
	:vehicle_model_id_from_dropdown_Input,
	:vehicle_color_Input,
	:licensePlateInput,
	:isActiveCheckbox
);

-- Insert a new incident into Incidents. Will likely work in conjunction with queries
-- below to affiliate a case officer and any other involved officers.
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

-- Insert a new Firearm.
INSERT INTO Firearms (year, firearmModelID, isActive, officerID) VALUES (
	:yearInput,
	:firearm_model_id_from_dropdown_Input,
	:isActiveCheckbox,
	:officer_id_from_dropdown_Input
);

-- Insert a new FirearmModel.
INSERT INTO FirearmModels (model, firearmMakeID, caliber, type) VALUES (
	:modelInput,
	:firearm_make_id_from_dropdown_Input,
	:caliberInput,
	:typeInput
);

-- Insert a new FirearmMake.
INSERT INTO FirearmMakes (make) VALUES (
	:makeInput
);


--
-- DELETION QUERIES
--

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