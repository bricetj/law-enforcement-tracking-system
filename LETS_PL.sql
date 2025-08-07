/******************************************************************************
    File Name:      LETS_PL.sql
    Description:    Creates procedure language for CRUD operations on the site.
    Authors:        Brice Jenkins, Andrew Heilesen [Team 36 - The Officers]
    Class/Section:  CS340 Introduction to Databases
    Assignment:     Project Step 4
    Date Created:   August 6, 2025
    Last Modified:  August 7, 2025

******************************************************************************/

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