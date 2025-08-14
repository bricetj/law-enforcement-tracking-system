/*
 * Brice Jenkins and Andrew Heilesen
 * Copyright: 2025
 */

import TableRow from './TableRow';

/**
 * Imports TableRow component and creates a dynamic HTML table to display
 * entries queried from the database.
 * @param {boolean} isIncidents Determines if a table is for Incidents or not.
 * Incidents show a different icon in TableRow.
 * @param {array} tableData An array of objects.
 * @param {function} onEdit A function that runs when the edit icon is selected
 * in the table.
 * @param {function} onView A function runs when the view icon is selected in
 * the table.
 * @param {function} onDelete A function that runs when the delete icon is
 * selected in the table.
 * @returns A React element that renders an HTML table.
 */
function Table( {isIncidents, tableData, onEdit, onView, onDelete } ) {
    // If array is empty.
    if (!tableData || tableData.length === 0) {
        return <p>No data to display.</p>
    }
    
    return (
        <table>
                <thead>
                    <tr>
                        <th></th>
                        {tableData.length > 0 && Object.keys(tableData[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {tableData.map((row, index) => (
                        <TableRow
                            key={index}
                            isIncidents={isIncidents}
                            rowObject={row}
                            onEdit={onEdit}
                            onView={onView}
                            onDelete={onDelete}/>
                    ))}
                </tbody>
        </table>
    );
}

export default Table;