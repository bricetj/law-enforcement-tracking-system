import React from 'react';
import TableRow from './TableRow';
import { Link, useLocation } from 'react-router-dom';

function Table( {isIncidents, tableData, onEdit, onView} ) {
    if (!tableData || tableData.length === 0) {
        return <p>No data to display.</p>
    }
    
    return (
        <table>
                <thead>
                    <tr>
                        {isIncidents && <th></th>}
                        <th></th>
                        {tableData.length > 0 && Object.keys(tableData[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {tableData.map((row, index) => (
                        <TableRow key={index} isIncidents={isIncidents} rowObject={row} onEdit={onEdit} onView={onView}/>
                    ))}
                </tbody>
        </table>
    );
}

export default Table;