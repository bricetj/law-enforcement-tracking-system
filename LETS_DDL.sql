/******************************************************************************
    File Name:      LETS_DDL.sql
    Description:    Creates the initial schema for the Law Enforcement Tracking
                    System (LETS) database and inserts sample data into each
                    table.
    Authors:        Brice Jenkins, Andrew Heilesen [Team 36 - The Officers]
    Class/Section:  CS340 Introduction to Databases
    Assignment:     Project Step 2 - DDL
    Date Created:   July 22, 2025
    Last Modified:  August 6, 2025

******************************************************************************/

DROP PROCEDURE IF EXISTS sp_load_lets;
DELIMITER //
CREATE PROCEDURE sp_load_lets()
BEGIN



SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

/*
Creates the VehicleMakes table and inserts sample data. Has a 1:M relationship
with VehicleModels which is implemented with a vehicleMakeID as a FK inside of
VehicleModels.
*/
CREATE OR REPLACE TABLE VehicleMakes (
    vehicleMakeID INT AUTO_INCREMENT UNIQUE NOT NULL,
    make VARCHAR(50) UNIQUE,
    PRIMARY KEY (vehicleMakeID)
);

INSERT INTO VehicleMakes (make)
VALUES ('Chevy'),('Dodge'),('Ford'),('Jeep'),('Nissan');

/*
Creates the VehicleModels table and inserts sample data. Enforces M:1 relationship
with VehicleMakes by referencing vehicleMakeID as a FK here. Table also has a 1:M
relationship with Vehicles which is implemented with vehicleModelID as a FK inside
of Vehicles.
*/
DROP TABLE IF EXISTS VehicleModels;
CREATE TABLE VehicleModels (
    vehicleModelID INT AUTO_INCREMENT UNIQUE NOT NULL,
    model VARCHAR(50),
    vehicleMakeID INT NOT NULL,
    PRIMARY KEY (vehicleModelID),
    FOREIGN KEY (vehicleMakeID) REFERENCES VehicleMakes (vehicleMakeID) ON DELETE CASCADE,
    CONSTRAINT makeModel UNIQUE (model, vehicleMakeID)
);

INSERT INTO VehicleModels (model, vehicleMakeID)
VALUES ('Blazer', 1),('Silverado 1500', 1),('Tahoe', 1),('Charger', 2),
       ('Durango', 2),('Ram 1500', 2),('Crown Victoria', 3),('Explorer', 3),
       ('Mustang', 3),('Taurus', 3),('Grand Cherokee', 4),('Grand Wagoneer', 4),
       ('Pathfinder', 5);

/*
Creates the Vehicle table and inserts sample data. Enforces M:1 relationship
with VehicleModels by referencing vehicleModelID as a FK here. Also enforces
M:1 relationship with VehicleColors by referencing vehicleColorID as a FK here.
Table also has a 1:M relationship with Officers which is implemented with
vehicleID as a FK inside of Officers.
*/
CREATE OR REPLACE TABLE Vehicles (
    vehicleID VARCHAR(50) UNIQUE NOT NULL,
    year INT NOT NULL,
    vehicleModelID INT NOT NULL,
    color ENUM('Black','Blue','Brown','Gold','Green','Gray','Orange','Purple','Red','Silver','White','Yellow') NOT NULL,
    licensePlate VARCHAR(50) UNIQUE,
    isActive TINYINT(1) DEFAULT 1 NOT NULL,
    PRIMARY KEY (vehicleID),
    FOREIGN KEY (vehicleModelID) REFERENCES VehicleModels (vehicleModelID) ON DELETE RESTRICT
);

INSERT INTO Vehicles (vehicleID, year, vehicleModelID, color, licensePlate, isActive)
VALUES ('1HGBH41JXMN109186', 2018, 4, 'Gray', 'RFD9956', 1),
       ('1RHBJ61JRLN180456', 2018, 4, 'Gray', 'RFD4567', 1),
       ('1YRDF53NMBV843521', 2022, 3, 'Black', 'HHH9989', 1),
       ('2VCBM22MION734889', 2021, 5, 'Black', 'VBV4324', 1),
       ('1QWRT09BMNR034298', 2011, 7, 'White', 'CED7656', 0),
       ('3UNNL67JXNN081123', 2016, 6, 'White', 'BBM8211', 1),
       ('6GGDF13PIPJ089956', 2020, 8, 'White', 'RRF8908', 1),
       ('1RRQR54JIOM413412', 2018, 4, 'White', 'RLL1231', 1);

/*
Creates the Officers table and inserts sample data. Enforces M:1 relationship
with Vehicles by referencing vehicleID as a FK here. Table also has a 1:M
relationship with Firearms which is implemented with officerID as a FK inside
Firearms. Additionally, Officers has a M:M relationship with Incidents which
is implemented with officerID and incidentID as FKs in OfficerIncidents.
*/
CREATE OR REPLACE TABLE Officers (
    officerID INT AUTO_INCREMENT UNIQUE NOT NULL,
    ssn VARCHAR(50) UNIQUE NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    middleName VARCHAR(50),
    lastName VARCHAR(50) NOT NULL,
    dob DATE NOT NULL,
    address VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    isActive TINYINT(1) DEFAULT 1 NOT NULL,
    vehicleID VARCHAR(50),
    PRIMARY KEY (officerID),
    FOREIGN KEY (vehicleID) REFERENCES Vehicles (vehicleID) ON DELETE SET NULL
);

INSERT INTO Officers (ssn, firstName, middleName, lastName, dob, address, email, isActive, vehicleID)
VALUES ('111-22-3333', 'James', 'Felix', 'Livingston', '19920802', '555 N Greenfield Drive, East Coast, VA 23455', 'james.livingston@ecpd.gov', 1, '1RHBJ61JRLN180456'),
       ('222-33-4444', 'Rick', 'Alston', 'Manly', '19950612', '25 Nottingham Woods Drive, East Coast, VA 23455', 'rick.manly@ecpd.gov', 1, '3UNNL67JXNN081123'),
       ('333-44-5555', 'Gary', 'Ryan', 'Lakish', '19850422', '35 North Boulevard, East Coast, VA 23455', 'gary.lakish@ecpd.gov', 1, '2VCBM22MION734889'),
       ('444-55-6666', 'William', 'Austin', 'Redmond', '20011209', '22 Arbor Street, East Coast, VA 23455', 'william.redmond@ecpd.gov', 1, '6GGDF13PIPJ089956'),
       ('555-66-7777', 'Harry', 'James', 'Potter', '19970526', '6554 Coastal Sands Drive, East Coast, VA 23455', 'harry.potter@ecpd.gov', 1, '1HGBH41JXMN109186'),
       ('666-77-8888', 'Webster', 'Tyrell', 'North', '19750623', '8775 Seagull Street, East Coast, VA 23455', 'webster.north@ecpd.gov', 0, NULL);

/*
Creates the FirearmMakes table and inserts sample data. Table has a 1:M
relationship with FirearmModels which is implemented with firearmMakeID as
a FK inside of FirearmModels.
*/
CREATE OR REPLACE TABLE FirearmMakes (
    firearmMakeID INT AUTO_INCREMENT UNIQUE NOT NULL,
    make VARCHAR(50) UNIQUE,
    PRIMARY KEY (firearmMakeID)
);

INSERT INTO FirearmMakes (make)
VALUES ('Glock'),('Mossberg'),('Remington'),('SIG Sauer');

/*
Creates the FirearmModels table and inserts sample data. Enforces a M:1
relationship with FirearmMakes by referencing firearmMakeID as a FK here.
Has a 1:M with Firearms which is implemented with firearmModelID as a FK
inside Firearms.
*/
CREATE OR REPLACE TABLE FirearmModels (
    firearmModelID INT AUTO_INCREMENT UNIQUE NOT NULL,
    model VARCHAR(50),
    firearmMakeID INT NOT NULL,
    caliber VARCHAR(50),
    type VARCHAR(50),
    PRIMARY KEY (firearmModelID),
    FOREIGN KEY (firearmMakeID) REFERENCES FirearmMakes (firearmMakeID) ON DELETE CASCADE,
    CONSTRAINT makeModel UNIQUE (model, firearmMakeID)
);

INSERT INTO FirearmModels (model, firearmMakeID, caliber, type)
VALUES ('G17', 1, '9mm', 'Handgun'),
       ('G45', 1, '9mm', 'Handgun'),
       ('590', 2, NULL, 'Shotgun'),
       ('Model 700', 3, '.308', 'Rifle'),
       ('P226', 4, '9mm', 'Handgun'),
       ('516', 4, '.223', 'Rifle');

/*
Creates the Firearms table and inserts sample data. Enforces a M:1 relationship
with FirearmModels by referencing firearmModelID as a FK here. Table also
enforces a M:1 relationship with Officers by referencing officerID as a FK here.
*/
CREATE OR REPLACE TABLE Firearms (
    firearmID VARCHAR(50) UNIQUE NOT NULL,
    year INT,
    firearmModelID INT NOT NULL,
    isActive TINYINT(1) DEFAULT 1 NOT NULL,
    officerID INT,
    PRIMARY KEY (firearmID),
    FOREIGN KEY (firearmModelID) REFERENCES FirearmModels (firearmModelID) ON DELETE RESTRICT,
    FOREIGN KEY (officerID) REFERENCES Officers (officerID) ON DELETE SET NULL
);

INSERT INTO Firearms (firearmID, year, firearmModelID, isActive, officerID)
VALUES ('BERR250', 2020, 1, 1, 1),
       ('BEFF349', 2020, 1, 1, 2),
       ('ACFR260', 2020, 1, 1, 3),
       ('ARGO122', 2020, 1, 1, 4),
       ('BERR251', 2020, 1, 1, 5),
       ('BEFF622', 2020, 1, 1, NULL),
       ('20KCR1909', 2021, 4, 1, 1),
       ('20KCR1401', 2021, 4, 1, 2),
       ('20KCR1902', 2021, 4, 1, 3),
       ('20KCR1722', 2021, 4, 1, 4),
       ('20KCR1411', 2021, 4, 1, 5),
       ('21KCR1402', 2021, 4, 1, NULL);

/*
Creates the Incidents table and inserts sample data. Has a M:M relationship
with Officers which is implemented with officerID and incidentID as FKs in
OfficerIncidents. 
*/
CREATE OR REPLACE TABLE Incidents (
    incidentID INT AUTO_INCREMENT UNIQUE NOT NULL,
    date DATE NOT NULL,
    description TEXT,
    isActive TINYINT(1) DEFAULT 1 NOT NULL,
    PRIMARY KEY (incidentID)
);

INSERT INTO Incidents (date, description, isActive)
VALUES ('20200415', "On April 15, 2020, at approximately 9:00 p.m., I responded to a report of a vehicle break-in in the PVA of Max Rebo Hardware, located at 403 West Fordham Blvd. After I arrived on scene, I observed a male subject, later identified as Max Rebo, using a lock picking device to open the driver side door of a Blue 2020 Honda Civic (VA Registration: RBC3445) which was registered to Rebo. I exited my vehicle and spoke with Rebo who said he locked his keys in his vehicle and needed assistance. Rebo stated he did not know how to use the device and gave me permission to assist him. I used the lock opening device and successfully opened the driver side door for Rebo to enter his vehicle. At approximately 9:20 p.m., I left the PVA of Max Rebo Hardware.", 0),
       ('20220316', "On March 16, 2022, at approximately 2:00 a.m., Officer G. Lakish and I responded to a report of loud music coming from a residence located at 223 Coastal Ave. We arrived on scene and approached the front door. I made contact with the house owner, identified as Bobby Rigsby, and told Rigsby ECPD received complaints due to the loud music. Rigsby turned down the music and stated, 'The party is pretty much over anyway.' At approximately 2:10 a.m., Officer Lakish and I entered our patrol vehicles and left the scene.", 0),
       ('20221112', "On November 12, 2022, at approximately 4:00 a.m., I responded to a report of a suspicious person carrying a backpack and running behind residences located on the 300 block of Coastal Avenue. As I drove past the 400 block of Coastal Avenue, I observed a male subject, identified as Rick Jenkins, running in athletic clothing with a backpack. Jenkins had a flashlight in his right hand. I activated my vehicle's emergency lights temporarily to signal to Jenkins to stop. I then exited my patrol vehicle and made contact with Jenkins. Jenkins explained he was running for exercise and used a weighted backpack to enhance his training. Jenkins gave me consent to search his backpack. I looked inside the main compartment of the backpack and located some sandbags, energy gels, and a water bottle. I told Jenkins to enjoy his run and then exited the scene at approximately 4:10 a.m.", 0),
       ('20230920', "On September 20, 2023, at approximately 2:00 p.m., while driving westbound on Highway 34 near the 56 mile marker, I observed a Red 2023 Porsche 911 (VA Registration LTHMCOOK) overtake my vehicle at a high rate of speed. I paced the vehicle for approximately 1 mile and observed the calibrated speedometer on my patrol vehicle read 90 mph. The speed limit on Hwy 34 is 65 mph. I activated my emergency lights and siren and conducted a traffic stop of the vehicle. I approached the passenger side of the vehicle and made contact with the driver, identified as Jim Diesel. I introduced myself and asked Diesel for his license. Diesel admitted he was speeding and apologized. He explained he just purchased his vehicle and wanted to 'let it cook'. I returned to my vehicle and checked Diesel's information through dispatch. I then issued Diesel a written warning for speeding and told him he was free to go. At approximately 2:15 p.m., I returned to my patrol vehicle and left the scene.", 0);

/*
Creates the OfficerIncidents table and inserts sample data. This is an
intersection table that supports M:M relationship between Officers and
Incidents.
*/
CREATE OR REPLACE TABLE OfficerIncidents (
    officerID INT NOT NULL,
    incidentID INT NOT NULL,
    isCaseOfficer TINYINT(1) NOT NULL,
    PRIMARY KEY (officerID, incidentID),
    FOREIGN KEY (officerID) REFERENCES Officers (officerID) ON DELETE CASCADE,
    FOREIGN KEY (incidentID) REFERENCES Incidents (incidentID) ON DELETE CASCADE
);

INSERT INTO OfficerIncidents (officerID, incidentID, isCaseOfficer)
VALUES (1, 1, 1),(4, 2, 1),(3, 2, 0),(2, 3, 1),(5, 4, 1);

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;



END //
DELIMITER ;