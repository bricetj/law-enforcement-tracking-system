/******************************************************************************
    File Name:      LETS_DML.sql
    Description:    A list of data manipulation queries to be used in our
                    application.
    Authors:        Brice Jenkins, Andrew Heilesen [Team 36 - The Officers]
    Class/Section:  CS340 Introduction to Databases
    Assignment:     Project Step 3 - DML
    Date Created:   July 30, 2025
    Last Modified:  August 7, 2025

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

-- Current query used to populate Vehicles page for standardized ID field
-- (will likely be replaced by a view).
SELECT Vehicles.vehicleID AS 'ID', Vehicles.color AS 'Color', Vehicles.year AS 'Year',
VehicleMakes.make AS 'Make', VehicleModels.model AS 'Model', Vehicles.licensePlate as
'License Plate', Officers.lastName AS 'Assigned Officer', IF(Vehicles.isActive = 1,
'Active', 'Inactive') AS 'Active Status'
FROM Vehicles
	JOIN VehicleModels ON Vehicles.vehicleModelID = VehicleModels.vehicleModelID
	JOIN VehicleMakes ON VehicleMakes.vehicleMakeID = VehicleModels.vehicleMakeID
	LEFT JOIN Officers ON Officers.vehicleID = Vehicles.vehicleID
ORDER BY Vehicles.vehicleID ASC;

-- Populate Vehicles page (eventual view).
SELECT Vehicles.vehicleID AS 'VIN', Vehicles.color AS 'Color', Vehicles.year AS 'Year',
VehicleMakes.make AS 'Make', VehicleModels.model AS 'Model', Vehicles.licensePlate as
'License Plate', Officers.lastName AS 'Assigned Officer', IF(Vehicles.isActive = 1,
'Active', 'Inactive') AS 'Active Status'
FROM Vehicles
	JOIN VehicleModels ON Vehicles.vehicleModelID = VehicleModels.vehicleModelID
	JOIN VehicleMakes ON VehicleMakes.vehicleMakeID = VehicleModels.vehicleMakeID
	LEFT JOIN Officers ON Officers.vehicleID = Vehicles.vehicleID
ORDER BY Vehicles.vehicleID ASC;

-- Populate Vehicles page (status = active)
SELECT Vehicles.vehicleID AS 'VIN', Vehicles.color AS 'Color', Vehicles.year AS 'Year',
VehicleMakes.make AS 'Make', VehicleModels.model AS 'Model', Vehicles.licensePlate as
'License Plate', Officers.lastName AS 'Assigned Officer', IF(Vehicles.isActive = 1, 'Active',
'Inactive') AS 'Active Status'
FROM Vehicles
	JOIN VehicleModels ON Vehicles.vehicleModelID = VehicleModels.vehicleModelID
	JOIN VehicleMakes ON VehicleMakes.vehicleMakeID = VehicleModels.vehicleMakeID
	LEFT JOIN Officers ON Officers.vehicleID = Vehicles.vehicleID
WHERE Vehicles.isActive = 1
ORDER BY Vehicles.vehicleID ASC;

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

-- Current query used to populate Incidents page for standardized ID field
-- (will likely be replaced by a view).
SELECT Incidents.incidentID AS 'ID', DATE_FORMAT(Incidents.date, '%Y-%m-%d')
AS 'Date', Incidents.description AS 'Narrative', Officers.firstName AS 'First Name',
Officers.lastName AS 'Last Name', IF(Incidents.isActive = 1, 'Active', 'Inactive') AS 'Case Status'
	JOIN OfficerIncidents ON Incidents.incidentID = OfficerIncidents.incidentID
	JOIN Officers ON OfficerIncidents.officerID = Officers.officerID
WHERE OfficerIncidents.isCaseOfficer = 1;

-- Populate Incidents page (to be used as a view later).
SELECT Incidents.incidentID AS 'Incident Number', DATE_FORMAT(Incidents.date, '%Y-%m-%d')
AS 'Date', Incidents.description AS 'Narrative', Officers.firstName AS 'First Name',
Officers.lastName AS 'Last Name', IF(Incidents.isActive = 1, 'Active', 'Inactive') AS 'Case Status'
	JOIN OfficerIncidents ON Incidents.incidentID = OfficerIncidents.incidentID
	JOIN Officers ON OfficerIncidents.officerID = Officers.officerID
WHERE OfficerIncidents.isCaseOfficer = 1;

-- Populate Incidents page (basic info only)
SELECT Incidents.incidentID AS 'Incident Number', DATE_FORMAT(Incidents.date, '%Y-%m-%d') AS
'Date', Officers.lastName AS 'Case Officer', IF(Incidents.isActive = 1, 'Active', 'Inactive') AS
'Case Status'
FROM Incidents
	JOIN OfficerIncidents ON Incidents.incidentID = OfficerIncidents.incidentID
	JOIN Officers ON Officers.officerID = OfficerIncidents.officerID
WHERE OfficerIncidents.isCaseOfficer = 1
ORDER BY Incidents.incidentID ASC;

-- Populate Incidents page (status = active)
SELECT Incidents.incidentID AS 'Incident Number', DATE_FORMAT(Incidents.date, '%Y-%m-%d') AS
'Date', Incidents.description AS 'Narrative', Officers.firstName AS 'First Name',
Officers.lastName AS 'Last Name', IF(Incidents.isActive = 1, 'Active', 'Inactive') AS 'Case Status'
FROM Incidents
	JOIN OfficerIncidents ON Incidents.incidentID = OfficerIncidents.incidentID
	JOIN Officers ON OfficerIncidents.officerID = Officers.officerID
WHERE OfficerIncidents.isCaseOfficer = 1 AND Incidents.isActive = 1;

-- Display incident per ID
SELECT Incidents.incidentID AS 'Incident Number', DATE_FORMAT(Incidents.date, '%Y-%m-%d') AS
'Date', Incidents.description AS 'Narrative', Officers.firstName AS 'First Name', Officers.lastName AS
'Last Name', IF(Incidents.isActive = 1, 'Active', 'Inactive') AS 'Case Status'
FROM Incidents
	JOIN OfficerIncidents ON Incidents.incidentID = OfficerIncidents.incidentID
	JOIN Officers ON Officers.officerID = OfficerIncidents.officerID
WHERE Incidents.incidentID = :incident_id_from_dropdown_Input AND OfficerIncidents.isCaseOfficer = 1;

-- Gather associated officers per incident
SELECT Officers.officerID, Officers.firstName, Officers.lastName
FROM Officers
	JOIN OfficerIncidents ON Officers.officerID = OfficerIncidents.officerID
	JOIN Incidents ON OfficerIncidents.incidentID = Incidents.incidentID
WHERE Incident.incidentID = :incident_id_from_dropdown_Input;

-- Update incident description
UPDATE Incidents
SET
	description = :descriptionInput
WHERE incidentID = :incident_id_from_dropdown_Input;

-- Update incident active status
UPDATE Incidents
SET
	isActive = :isActiveCheckbox
WHERE incidentID = :incident_id_from_dropdown_Input;


--
-- DISPLAY/UPDATE QUERIES (OFFICERS PAGE): Queries to display/filter data in table on
-- Officers page within the application. Also contains queries to update Officer info.
--

-- Current query used to populate Officers page for standardized ID field
-- (will likely be replaced by a view).
SELECT officerID AS 'ID', firstName AS 'First Name', middleName AS 'Middle Name',
lastName AS 'Last Name', ssn AS SSN, DATE_FORMAT(dob, '%Y-%m-%d') AS 'Date of Birth',
address AS Address, email AS Email, IF(isActive = 1, 'Active', 'Inactive') AS 'Active Status'
FROM Officers
ORDER BY officerID ASC;

-- Populate Officers page (will like be the query used in the view).
SELECT officerID AS 'Badge No.', firstName AS 'First Name', middleName AS 'Middle Name',
lastName AS 'Last Name', ssn AS SSN, DATE_FORMAT(dob, '%Y-%m-%d') AS 'Date of Birth',
address AS Address, email AS Email, IF(isActive = 1, 'Active', 'Inactive') AS 'Active Status'
FROM Officers
ORDER BY officerID ASC;

-- Populate Officers page (active)
SELECT officerID AS 'Badge No.', firstName AS 'First Name', middleName AS 'Middle Name',
lastName AS 'Last Name', ssn AS SSN, DATE_FORMAT(dob, '%Y-%m-%d') AS 'Date of Birth',
address AS Address, email AS Email, IF(isActive = 1, 'Active', 'Inactive') AS 'Active Status'
FROM Officers
WHERE Officers.isActive = 1
ORDER BY officerID ASC;

-- Update Officer name
UPDATE Officer
SET
	firstName = :firstNameInput,
	middleName = :middleNameInput,
	lastName = :lastNameInput
WHERE officerID = :officer_id_from_dropdown_Input;

-- Update Officer vehicle
UPDATE Officer
SET
	vehicleID = :vehicle_id_from_dropdown_Input
WHERE officerID = :officer_id_from_dropdown_Input;

-- Update Officer contact info
UPDATE Officer
SET
	address = :addressInput
	email = :emailInput
WHERE officerID = :officer_id_from_dropdown_Input;

-- Update Officer active status
UPDATE Officer
SET
	isActive = :isActiveCheckbox
WHERE officerID = :officer_id_from_dropdown_Input;


--
-- DISPLAY/UPDATE QUERIES (FIREARMS PAGE): Queries to display/filter data in table on
-- Firearms page within the application. Also contains queries to update Firearms info.
--

-- -- Current query used to populate Firearms page for standardized ID field
-- (will likely be replaced by a view).
SELECT Firearms.firearmID AS 'ID', Firearms.year AS 'Year', FirearmMakes.make AS
'Make', FirearmModels.model AS 'Model', Officers.lastName AS 'Assigned Officer',
IF(Firearms.isActive = 1, 'Active', 'Inactive') AS 'Active Status'
FROM Firearms
	JOIN FirearmModels ON Firearms.firearmModelID = FirearmModels.firearmModelID
	JOIN FirearmMakes ON FirearmMakes.firearmMakeID = FirearmModels.firearmMakeID
	LEFT JOIN Officers ON Officers.officerID = Firearms.officerID
ORDER BY Firearms.firearmID ASC;

-- Populate Firearms page (will likely be used as a view).
SELECT Firearms.firearmID AS 'Serial Number', Firearms.year AS 'Year', FirearmMakes.make AS
'Make', FirearmModels.model AS 'Model', Officers.lastName AS 'Assigned Officer',
IF(Firearms.isActive = 1, 'Active', 'Inactive') AS 'Active Status'
FROM Firearms
	JOIN FirearmModels ON Firearms.firearmModelID = FirearmModels.firearmModelID
	JOIN FirearmMakes ON FirearmMakes.firearmMakeID = FirearmModels.firearmMakeID
	LEFT JOIN Officers ON Officers.officerID = Firearms.officerID
ORDER BY Firearms.firearmID ASC;

-- Update firearm officer
UPDATE Firearms
SET
	officerID = :officer_id_from_dropdown_Input
WHERE firearmID = :firearm_id_from_dropdown_Input;


--
-- INSERTION QUERIES: For all entities within the application
--

-- Insert a new make into VehicleMakes.
INSERT INTO VehicleMakes (make) VALUES (
	:makeInput
);

-- Insert a new model into VehicleModels that is affiliated with a preexisting
-- make.
INSERT INTO VehicleModels (mode, vehicleMakeID) VALUES (
	:modelInput,
	:vehicle_make_id_from_dropdown_Input
);

-- Insert a new Vehicle into Vehicles.
INSERT INTO Vehicles (year, vehicleModelID, color, licensePlate, isActive) VALUES (
	:yearInput,
	:vehicle_model_id_from_dropdown_Input,
	:vehicle_color_Input,
	:licensePlateInput,
	:isActiveCheckbox
);

-- Insert a new incident into Incidents. Will likely work in conjunction with queries
-- below to affiliate a case officer and any other involved officers.
INSERT INTO Incidents (date, description, isActive) VALUES (
	:dateInput,
	:descriptionInput,
	:isActiveCheckbox
);

-- Query to affiliate Officer(s) with Incidents.
INSERT INTO OfficerIncidents (officerID, incidentID) VALUES (
	:officer_id_from_dropdown_Input,
	:incident_id_from_dropdown_Input
);

-- Insert a new Officers.
INSERT INTO Officers (ssn, firstName, middleName, lastName, dob, address, email, isActive, vehicleID) VALUES (
	:ssnInput,
	:firstNameInput,
	:middleNameInput
	:lastNameInput,
	:dobInput,
	:addressInput,
	:emailInput,
	:isActiveCheckbox,
	:vehicle_id_from_dropdown_Input
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