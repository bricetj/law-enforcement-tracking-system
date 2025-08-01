import { MdCreate, MdDelete, MdOutlinePageview } from 'react-icons/md';

/**
 * Creates a HTML table row to display each object from the database.
 * Generally displays an edit icon and a delete icon for each row. If data
 * if from Incidents, the edit icon is replaced by a view icon.
 * @param {boolean} isIncidents Determines if a table is for Incidents or not.
 * @param {object} rowObject An object of data representing a row.
 * @param {function} onEdit A function that sets a variable with data to be
 * edited and initiates editing procedures.
 * @returns A React element that renders an HTML table row.
 */
const TableRow = ({ isIncidents, rowObject, onEdit, onView }) => {
    return (
        <tr>
            {isIncidents &&
                <td> 
                    <MdOutlinePageview
                        className='view-icon'
                        href='/'
                        onClick = {e => {
                            e.preventDefault();
                            onView(rowObject)}}>
                    </MdOutlinePageview>
                </td>
            }
            {!isIncidents &&
                <td>
                    <MdCreate
                        className='edit-icon'
                        href='/'
                        onClick = {e => {
                            e.preventDefault();
                            onEdit(rowObject)}}>
                    </MdCreate>
                </td>
            }
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            <td>
                <MdDelete
                    className='delete-icon'
                    href='/'
                    onClick = {e => {
                        e.preventDefault();
                        onDelete(exercise._id)}}>
                </MdDelete>
            </td>
        </tr>
    );
};

export default TableRow;