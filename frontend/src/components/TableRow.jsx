import { MdCreate, MdDelete, MdOutlinePageview } from 'react-icons/md';

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