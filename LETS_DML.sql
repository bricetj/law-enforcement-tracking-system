SELECT Incidents.incidentID, Officers.lastName AS caseOfficer, Incidents.date
FROM Incidents
JOIN OfficerIncidents ON Incidents.incidentID = OfficerIncidents.incidentID
JOIN Officers ON Officers.officerID = OfficerIncidents.officerID
WHERE OfficerIncidents.isCaseOfficer = 1;


SELECT Vehicles.vehicleID AS 'VIN', Vehicles.color AS 'Color', Vehicles.year AS 'Year',
VehicleMakes.make AS 'Make', VehicleModels.model AS 'Model', Vehicles.licensePlate as 'License Plate',
Officers.lastName AS 'Assigned Officer', IF(Vehicles.isActive = 1, 'Yes', 'No') AS 'Active Status'
FROM Vehicles
JOIN VehicleModels ON Vehicles.vehicleModelID = VehicleModels.vehicleModelID
JOIN VehicleMakes ON VehicleMakes.vehicleMakeID = VehicleModels.vehicleMakeID
LEFT JOIN Officers ON Officers.vehicleID = Vehicles.vehicleID;

SELECT Firearms.firearmID AS 'Serial Number', Firearms.year AS 'Year',
FirearmMakes.make AS 'Make', FirearmModels.model AS 'Model', Officers.lastName AS 'Assigned Officer',
IF(Firearms.isActive = 1, 'Yes', 'No') AS 'Active Status'
FROM Firearms
JOIN FirearmModels ON Firearms.firearmModelID = FirearmModels.firearmModelID
JOIN FirearmMakes ON FirearmMakes.firearmMakeID = FirearmModels.firearmMakeID
LEFT JOIN Officers ON Officers.officerID = Firearms.officerID
ORDER BY Firearms.firearmID ASC;

SELECT Incidents.incidentID AS 'ID', DATE_FORMAT(Incidents.date, '%Y-%m-%d') AS 'Date',
Incidents.description AS 'Narrative', Officers.firstName AS 'First Name', Officers.lastName AS 'Last Name'
FROM Incidents
JOIN OfficerIncidents ON Incidents.incidentID = OfficerIncidents.incidentID JOIN Officers ON
Officers.officerID = OfficerIncidents.officerID WHERE Incidents.incidentID = 1 AND OfficerIncidents.isCaseOfficer = 1;