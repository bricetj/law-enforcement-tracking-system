/******************************************************************************
    File Name:      LETS_PL.sql
    Description:    Creates procedure language for CRUD operations on the site.
    Authors:        Brice Jenkins, Andrew Heilesen [Team 36 - The Officers]
    Class/Section:  CS340 Introduction to Databases
    Assignment:     Project Step 4
    Date Created:   August 6, 2025
    Last Modified:  August 12, 2025

******************************************************************************/


/******************************************
 *
 * Views for Page Tables
 *
 ******************************************/

--
-- Creates a view for the "Officers" page table.
--
DROP VIEW IF EXISTS view_officers;
CREATE VIEW view_officers AS
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


--
-- Creates a view for the "Incidents" page table.
--
DROP VIEW IF EXISTS view_incidents;
CREATE VIEW view_incidents AS
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


--
-- Creates a view for the "Vehicles" page table.
--
DROP VIEW IF EXISTS view_vehicles;
CREATE VIEW view_vehicles AS
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


--
-- Creates a view for the "VehicleMakes" page table.
--
DROP VIEW IF EXISTS view_vehicle_makes;
CREATE VIEW view_vehicle_makes AS
SELECT
    vehicleMakeID AS 'ID',
    make AS 'Make'
FROM VehicleMakes
ORDER BY vehicleMakeID ASC;


--
-- Creates a view for the "VehicleModels" page table.
--
DROP VIEW IF EXISTS view_vehicle_models;
CREATE VIEW view_vehicle_models AS
SELECT
    VehicleModels.vehicleModelID AS 'ID',
    VehicleMakes.make AS 'Make',
    VehicleModels.model AS 'Model'
FROM VehicleModels
    JOIN VehicleMakes ON VehicleModels.vehicleMakeID = VehicleMakes.vehicleMakeID
ORDER BY VehicleModels.vehicleModelID;


--
-- Creates a view for the "Firearms" page table.
--
DROP VIEW IF EXISTS view_firearms;
CREATE VIEW view_firearms AS
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


--
-- Creates a view for the "FirearmMakes" page table.
--
DROP VIEW IF EXISTS view_firearm_makes;
CREATE VIEW view_firearm_makes AS
SELECT
    firearmMakeID AS 'ID',
    make AS 'Make'
FROM FirearmMakes
ORDER BY firearmMakeID ASC;


--
-- Creates a view for the "FirearmModels" page table.
--
DROP VIEW IF EXISTS view_firearm_models;
CREATE VIEW view_firearm_models AS
SELECT
    FirearmModels.firearmModelID AS 'ID',
    FirearmMakes.make AS 'Make',
    FirearmModels.model AS 'Model'
FROM FirearmModels
JOIN FirearmMakes ON FirearmModels.firearmMakeID = FirearmMakes.firearmMakeID
ORDER BY FirearmModels.firearmModelID ASC;


/******************************************
 *
 * Stored Procedures for SELECT Operations
 *
 ******************************************/


--
-- Creates a stored procedure to SELECT an officer by officerID.
--
DROP PROCEDURE IF EXISTS sp_select_officer_by_id;
DELIMITER //
CREATE PROCEDURE sp_select_officer_by_id(
    IN idInput INT
)
BEGIN
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
    WHERE officerID = idInput;

END //
DELIMITER ;


--
-- Creates a stored procedure to SELECT an incident by incidentID.
--
DROP PROCEDURE IF EXISTS sp_select_incident_by_id;
DELIMITER //
CREATE PROCEDURE sp_select_incident_by_id(
    IN idInput INT
)
BEGIN
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
    WHERE Incidents.incidentID = idInput AND OfficerIncidents.isCaseOfficer = 1;

END //
DELIMITER ;


--
-- Creates a stored procedure to SELECT any non case officers affiliated
-- with an incident.
--
DROP PROCEDURE IF EXISTS sp_select_other_officers_by_incident_id;
DELIMITER //
CREATE PROCEDURE sp_select_other_officers_by_incident_id(
    IN idInput INT
)
BEGIN
    SELECT
        Officers.officerID AS 'ID',
        Officers.firstName AS 'firstName',
        Officers.lastName AS 'lastName'
        FROM Officers
            JOIN OfficerIncidents ON Officers.officerID = OfficerIncidents.officerID
        WHERE OfficerIncidents.incidentID = idInput AND OfficerIncidents.isCaseOfficer = 0;

END //
DELIMITER ;


--
-- Creates a stored procedure to SELECT a vehicle by vehicleID.
--
DROP PROCEDURE IF EXISTS sp_select_vehicle_by_id;
DELIMITER //
CREATE PROCEDURE sp_select_vehicle_by_id(
    IN idInput VARCHAR(50)
)
BEGIN
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
    WHERE Vehicles.vehicleID = idInput;

END //
DELIMITER ;

--
-- Creates a stored procedure to SELECT a VehicleMake by vehicleMakeID.
--
DROP PROCEDURE IF EXISTS sp_select_vehicle_make_by_id;
DELIMITER //
CREATE PROCEDURE sp_select_vehicle_make_by_id(
    IN idInput INT
)
BEGIN
    SELECT 
        vehicleMakeID AS 'id',
        make
    FROM VehicleMakes
    WHERE vehicleMakeID = idInput;

END //
DELIMITER ;

--
-- Creates a stored procedure to SELECT a VehicleModel by vehicleModelID.
--
DROP PROCEDURE IF EXISTS sp_select_vehicle_model_by_id;
DELIMITER //
CREATE PROCEDURE sp_select_vehicle_model_by_id(
    IN idInput INT
)
BEGIN
    SELECT 
        vehicleModelID AS 'id',
        model,
        vehicleMakeID AS 'makeID'
    FROM VehicleModels
    WHERE vehicleModelID = idInput;

END //
DELIMITER ;

--
-- Creates a stored procedure to SELECT a Firearm by firearmID.
--
DROP PROCEDURE IF EXISTS sp_select_firearm_by_id;
DELIMITER //
CREATE PROCEDURE sp_select_firearm_by_id(
    IN idInput VARCHAR(50)
)
BEGIN
    SELECT 
        firearmID AS 'id',
        year,
        firearmModelID AS 'modelID',
        isActive,
        officerID
    FROM Firearms
    WHERE firearmID = idInput;

END //
DELIMITER ;


--
-- Creates a stored procedure to SELECT a FirearmMake by firearmMakeID.
--
DROP PROCEDURE IF EXISTS sp_select_firearm_make_by_id;
DELIMITER //
CREATE PROCEDURE sp_select_firearm_make_by_id(
    IN idInput INT
)
BEGIN
    SELECT 
        firearmMakeID AS 'id',
        make
    FROM FirearmMakes
    WHERE firearmMakeID = idInput;

END //
DELIMITER ;

--
-- Creates a stored procedure to SELECT a FirearmModel by firearmModelID.
--
DROP PROCEDURE IF EXISTS sp_select_firearm_model_by_id;
DELIMITER //
CREATE PROCEDURE sp_select_firearm_model_by_id(
    IN idInput INT
)
BEGIN
    SELECT 
        firearmModelID AS 'id',
        model,
        firearmMakeID AS 'makeID'
    FROM FirearmModels
    WHERE firearmModelID = idInput;

END //
DELIMITER ;

/******************************************
 *
 * Stored Procedures for CREATE Operations
 *
 ******************************************/

--
-- Creates a stored procedure to add a new officer.
--
DROP PROCEDURE IF EXISTS sp_create_officer;
DELIMITER //
CREATE PROCEDURE sp_create_officer(
    IN ssnInput VARCHAR(50),
    IN firstNameInput VARCHAR(50),
    IN middleNameInput VARCHAR (50),
    IN lastNameInput VARCHAR (50),
    IN dobInput DATE,
    IN addressInput VARCHAR(100),
    IN emailInput VARCHAR(100),
    IN isActiveInput TINYINT(1)
)
BEGIN

    DECLARE row_added INT;
    INSERT INTO Officers (ssn, firstName, middleName, lastName, dob, address, email, isActive)
    VALUES (ssnInput, firstNameInput, middleNameInput, lastNameInput, dobInput, addressInput, emailInput, isActiveInput);

    -- Get the number of rows affected by the CREATE and checks if it was successful.
    SELECT ROW_COUNT() INTO row_added;
    IF row_added > 0 THEN
        -- Returns a single combined success message.
        SELECT 'Officer successfully added.' AS message;
    ELSE
        -- Or returns an error message.
        SELECT 'There was an error adding the new officer.' AS message;
    END IF;


END //
DELIMITER ;


--
-- Creates a stored procedure to add a new incident.
--
DROP PROCEDURE IF EXISTS sp_create_incident;
DELIMITER //
CREATE PROCEDURE sp_create_incident(
    IN dateInput DATE,
    IN descriptionInput TEXT,
    IN caseOfficerInput INT,
    IN isActiveInput TINYINT(1)
)
BEGIN

    DECLARE row_added INT;
    DECLARE incidentID INT;

    -- Insert the incident into Incidents.
    INSERT INTO Incidents (date, description, isActive)
    VALUES (dateInput, descriptionInput, isActiveInput);

    SELECT LAST_INSERT_ID() INTO incidentID;

    -- Insert the case officer into OfficerIncidents.
    CALL sp_create_officer_incident_record(caseOfficerInput, incidentID, 1);

    -- Get the number of rows affected by the CREATE and checks if it was successful.
    SELECT ROW_COUNT() INTO row_added;
    IF row_added > 0 THEN
        -- Returns a single combined success message.
        SELECT 'Incident successfully added.' AS message;
    ELSE
        -- Or returns an error message.
        SELECT 'There was an error adding the new incident.' AS message;
    END IF;


END //
DELIMITER ;


--
-- Creates a stored procedure to add a new vehicle.
--
DROP PROCEDURE IF EXISTS sp_create_vehicle;
DELIMITER //
CREATE PROCEDURE sp_create_vehicle(
    IN idInput VARCHAR(50),
    IN yearInput INT,
    IN modelIDInput INT,
    IN color VARCHAR(50),
    IN licensePlateInput VARCHAR(50),
    IN isActiveInput TINYINT(1)
)
BEGIN

    DECLARE row_added INT;
    INSERT INTO Vehicles (vehicleID, year, vehicleModelID, color, licensePlate, isActive)
    VALUES (idInput, yearInput, modelIDInput, color, licensePlateInput, isActiveInput);

    -- Get the number of rows affected by the CREATE and checks if it was successful.
    SELECT ROW_COUNT() INTO row_added;
    IF row_added > 0 THEN
        -- Returns a single combined success message.
        SELECT 'Vehicle successfully added.' AS message;
    ELSE
        -- Or returns an error message.
        SELECT 'There was an error adding the new vehicle.' AS message;
    END IF;


END //
DELIMITER ;


--
-- Creates a stored procedure to add a new OfficerIncident record.
--
DROP PROCEDURE IF EXISTS sp_create_officer_incident_record;
DELIMITER //
CREATE PROCEDURE sp_create_officer_incident_record(
    IN officerIDInput INT,
    IN incidentIDInput INT,
    IN isCaseOfficerInput TINYINT(1)
)
BEGIN

    DECLARE row_added INT;
    INSERT INTO OfficerIncidents (officerID, incidentID, isCaseOfficer)
    VALUES (officerIDInput, incidentIDInput, isCaseOfficerInput);

    -- Get the number of rows affected by the CREATE and checks if it was successful.
    SELECT ROW_COUNT() INTO row_added;
    IF row_added > 0 THEN
        -- Returns a single combined success message.
        SELECT 'OfficerIncident record successfully added.' AS message;
    ELSE
        -- Or returns an error message.
        SELECT 'There was an error adding the new OfficerIncident record.' AS message;
    END IF;


END //
DELIMITER ;


/******************************************
 *
 * Stored Procedures for UPDATE Operations
 *
 ******************************************/

--
-- Creates a stored procedure to update an officer.
--
DROP PROCEDURE IF EXISTS sp_update_officer;
DELIMITER //
CREATE PROCEDURE sp_update_officer(
    IN officerIDInput INT,
    IN ssnNew VARCHAR(50),
    IN firstNameNew VARCHAR(50),
    IN middleNameNew VARCHAR (50),
    IN lastNameNew VARCHAR (50),
    IN dobNew DATE,
    IN addressNew VARCHAR(100),
    IN emailNew VARCHAR(100),
    IN isActiveNew TINYINT(1)
)
BEGIN

    DECLARE row_updated INT;
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

    -- Get the number of rows affected by the UPDATE and checks if it was successful.
    SELECT ROW_COUNT() INTO row_updated;
    IF row_updated > 0 THEN
        -- Returns a single combined success message.
        SELECT 'Officer successfully updated.' AS message;
    ELSE
        -- Or returns an error message.
        SELECT 'There was an error updating the new officer.' AS message;
    END IF;


END //
DELIMITER ;


--
-- Creates a stored procedure to update an incident.
--
DROP PROCEDURE IF EXISTS sp_update_incident;
DELIMITER //
CREATE PROCEDURE sp_update_incident(
    IN incidentIDInput INT,
    IN dateNew DATE,
    IN descriptionNew TEXT,
    IN isActiveNew TINYINT(1)
)
BEGIN

    DECLARE row_updated INT;
    UPDATE Incidents
    SET date = dateNew,
        description = descriptionNew,
        isActive = isActiveNew
    WHERE incidentID = incidentIDInput;

    -- Get the number of rows affected by the UPDATE and checks if it was successful.
    SELECT ROW_COUNT() INTO row_updated;
    IF row_updated > 0 THEN
        -- Returns a single combined success message.
        SELECT 'Incident successfully updated.' AS message;
    ELSE
        -- Or returns an error message.
        SELECT 'There was an error updating the new incident.' AS message;
    END IF;


END //
DELIMITER ;
/******************************************
 *
 * Stored Procedures for DELETE Operations
 *
 ******************************************/


--
-- Creates a stored procedure to delete an officer by ID.
--
DROP PROCEDURE IF EXISTS sp_delete_officer;
DELIMITER //
CREATE PROCEDURE sp_delete_officer(
    IN input_id INT
)
BEGIN

    DECLARE rows_affected INT;
    DELETE FROM Officers WHERE officerID = input_id;

    -- Get the number of rows affected by the DELETE and checks if it was successful.
    SELECT ROW_COUNT() INTO rows_affected;
    IF rows_affected > 0 THEN
        -- Returns a single combined success message.
        SELECT 'Officer successfully deleted.' AS message;
    ELSE
        -- Or returns an error message.
        SELECT 'There was an error deleting the specified officer!' AS message;
    END IF;


END //
DELIMITER ;


--
-- Creates a stored procedure to delete an incident by ID.
--
DROP PROCEDURE IF EXISTS sp_delete_incident;
DELIMITER //
CREATE PROCEDURE sp_delete_incident(
    IN input_id INT
)
BEGIN

    DECLARE rows_affected INT;
    DELETE FROM Incidents WHERE incidentID = input_id;

    -- Get the number of rows affected by the DELETE and checks if it was successful.
    SELECT ROW_COUNT() INTO rows_affected;
    IF rows_affected > 0 THEN
        -- Returns a single combined success message.
        SELECT 'Incident successfully deleted.' AS message;
    ELSE
        -- Or returns an error message.
        SELECT 'There was an error deleting the specified incident!' AS message;
    END IF;


END //
DELIMITER ;


--
-- Creates a stored procedure to delete a vehicle by ID.
--
DROP PROCEDURE IF EXISTS sp_delete_vehicle;
DELIMITER //
CREATE PROCEDURE sp_delete_vehicle(
    IN input_id VARCHAR(50)
)
BEGIN

    DECLARE rows_affected INT;
    DELETE FROM Vehicles WHERE vehicleID = input_id;

    -- Get the number of rows affected by the DELETE and checks if it was successful.
    SELECT ROW_COUNT() INTO rows_affected;
    IF rows_affected > 0 THEN
        -- Returns a single combined success message.
        SELECT 'Vehicle successfully deleted.' AS message;
    ELSE
        -- Or returns an error message.
        SELECT 'There was an error deleting the specified vehicle!' AS message;
    END IF;


END //
DELIMITER ;


--
-- Creates a stored procedure to delete a vehicle make by ID.
--
DROP PROCEDURE IF EXISTS sp_delete_vehicle_make;
DELIMITER //
CREATE PROCEDURE sp_delete_vehicle_make(
    IN input_id INT
)
BEGIN

    DECLARE rows_affected INT;
    DELETE FROM VehicleMakes WHERE vehicleMakeID = input_id;

    -- Get the number of rows affected by the DELETE and checks if it was successful.
    SELECT ROW_COUNT() INTO rows_affected;
    IF rows_affected > 0 THEN
        -- Returns a single combined success message.
        SELECT 'Vehicle make successfully deleted.' AS message;
    ELSE
        -- Or returns an error message.
        SELECT 'There was an error deleting the specified vehicle make!' AS message;
    END IF;


END //
DELIMITER ;


--
-- Creates a stored procedure to delete a vehicle model by ID.
--
DROP PROCEDURE IF EXISTS sp_delete_vehicle_model;
DELIMITER //
CREATE PROCEDURE sp_delete_vehicle_model(
    IN input_id INT
)
BEGIN

    DECLARE rows_affected INT;
    DELETE FROM VehicleModels WHERE vehicleModelID = input_id;

    -- Get the number of rows affected by the DELETE and checks if it was successful.
    SELECT ROW_COUNT() INTO rows_affected;
    IF rows_affected > 0 THEN
        -- Returns a single combined success message.
        SELECT 'Vehicle model successfully deleted.' AS message;
    ELSE
        -- Or returns an error message.
        SELECT 'There was an error deleting the specified vehicle model!' AS message;
    END IF;


END //
DELIMITER ;


--
-- Creates a stored procedure to delete a firearm by ID.
--
DROP PROCEDURE IF EXISTS sp_delete_firearm;
DELIMITER //
CREATE PROCEDURE sp_delete_firearm(
    IN input_id VARCHAR(50)
)
BEGIN

    DECLARE rows_affected INT;
    DELETE FROM Firearms WHERE firearmID = input_id;

    -- Get the number of rows affected by the DELETE and checks if it was successful.
    SELECT ROW_COUNT() INTO rows_affected;
    IF rows_affected > 0 THEN
        -- Returns a single combined success message.
        SELECT 'Firearm successfully deleted.' AS message;
    ELSE
        -- Or returns an error message.
        SELECT 'There was an error deleting the specified firearm!' AS message;
    END IF;


END //
DELIMITER ;


--
-- Creates a stored procedure to delete a firearm make by ID.
--
DROP PROCEDURE IF EXISTS sp_delete_firearm_make;
DELIMITER //
CREATE PROCEDURE sp_delete_firearm_make(
    IN input_id INT
)
BEGIN

    DECLARE rows_affected INT;
    DELETE FROM FirearmMakes WHERE firearmMakeID = input_id;

    -- Get the number of rows affected by the DELETE and checks if it was successful.
    SELECT ROW_COUNT() INTO rows_affected;
    IF rows_affected > 0 THEN
        -- Returns a single combined success message.
        SELECT 'Firearm make successfully deleted.' AS message;
    ELSE
        -- Or returns an error message.
        SELECT 'There was an error deleting the specified firearm make!' AS message;
    END IF;


END //
DELIMITER ;


--
-- Creates a stored procedure to delete a firearm model by ID.
--
DROP PROCEDURE IF EXISTS sp_delete_firearm_model;
DELIMITER //
CREATE PROCEDURE sp_delete_firearm_model(
    IN input_id INT
)
BEGIN

    DECLARE rows_affected INT;
    DELETE FROM FirearmModels WHERE firearmModelID = input_id;

    -- Get the number of rows affected by the DELETE and checks if it was successful.
    SELECT ROW_COUNT() INTO rows_affected;
    IF rows_affected > 0 THEN
        -- Returns a single combined success message.
        SELECT 'Firearm model successfully deleted.' AS message;
    ELSE
        -- Or returns an error message.
        SELECT 'There was an error deleting the specified firearm model!' AS message;
    END IF;


END //
DELIMITER ;


--
-- Creates a stored procedure to delete a firearm model by ID.
--
DROP PROCEDURE IF EXISTS sp_delete_affiliated_officer;
DELIMITER //
CREATE PROCEDURE sp_delete_affiliated_officer(
    IN officerIDInput INT,
    IN incidentIDInput INT
)
BEGIN

    DECLARE rows_affected INT;
    DELETE FROM OfficerIncidents
    WHERE officerID = officerIDInput AND incidentID = incidentIDInput;

    -- Get the number of rows affected by the DELETE and checks if it was successful.
    SELECT ROW_COUNT() INTO rows_affected;
    IF rows_affected > 0 THEN
        -- Returns a single combined success message.
        SELECT 'OfficerIncidents record successfully deleted.' AS message;
    ELSE
        -- Or returns an error message.
        SELECT 'There was an error deleting the specified OfficerIncidents record!' AS message;
    END IF;


END //
DELIMITER ;