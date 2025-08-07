/*
 * Brice Jenkins and Andrew Heilesen
 * Copyright: 2025
 */

import { MdCreate, MdDelete, MdOutlinePageview } from 'react-icons/md';
import Tooltip from './Tooltip';

/**
 * Creates a HTML table row to display each object from the database.
 * Generally displays an edit icon and a delete icon for each row. If data
 * if from Incidents, the edit icon is replaced by a view icon.
 * @param {boolean} isIncidents Determines if a table is for Incidents or not.
 * @param {object} rowObject An object of data representing a row.
 * @param {function} onEdit A function that runs when the edit icon is selected
 * in the table.
 * @param {function} onView A function runs when the view icon is selected in
 * the table.
 * @param {function} onDelete A function that runs when the delete icon is
 * selected in the table.
 * @returns A React element that renders an HTML table row.
 */
const TableRow = ({ isIncidents, rowObject, onEdit, onView, onDelete}) => {
    const objectID = rowObject['ID'];
    return (
        <tr>
            {isIncidents &&
                <td className='table-icon'>
                    <Tooltip
                        text='View'
                        childElement={
                            <MdOutlinePageview
                                className='view-icon'
                                href='/'
                                onClick = {e => {
                                    e.preventDefault();
                                    onView(rowObject)}}>
                            </MdOutlinePageview>}
                        delay={1000}
                    ></Tooltip>
                </td> 
            }
            {!isIncidents &&
                <td className='table-icon'>
                    <Tooltip
                        text='Edit'
                        childElement={
                            <MdCreate
                                className='edit-icon'
                                href='/'
                                onClick = {e => {
                                    e.preventDefault();
                                    onEdit(rowObject)}}>
                            </MdCreate>}
                        delay={1000}
                    ></Tooltip>
                </td>
            }
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            <td className='table-icon'>
                <Tooltip
                    text='Delete'
                    childElement={
                        <MdDelete
                            className='delete-icon'
                            href='/'
                            onClick = {e => {
                                e.preventDefault();
                                onDelete(objectID)}}>
                        </MdDelete>}
                    delay={1000}
                ></Tooltip>
            </td>
        </tr>
    );
};

export default TableRow;