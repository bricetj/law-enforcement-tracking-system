import { useEffect, useState } from 'react';

function OfficerForm ({mode, officerToEdit}) {
    const [officerData, setOfficerData] = useState({});
    
    useEffect(() => {
        if(mode === 'edit' && officerToEdit) {
            setOfficerData(officerToEdit);
        } else {
            setOfficerData({});
        }
    }, [mode, officerToEdit]);

    return (
        <div className='officer-form'>
            <fieldset>
                <label>First Name:&nbsp;
                    <input
                        type='text'
                        required='required'
                        placeholder='Enter first name here'
                        value={officerData['First Name'] || ''}
                        onChange={f => setFirstName(f.target.value)} />
                </label>
                &nbsp;&nbsp;
                <label>Middle Name:&nbsp;
                    <input
                        type='text'
                        placeholder='Enter middle name here'
                        value={officerData['Middle Name'] || ''}
                        onChange={f => setMiddleName(f.target.value)} />
                </label>
                &nbsp;&nbsp;
                <label>Last Name:&nbsp;
                    <input
                        type='text'
                        required='required'
                        placeholder='Enter last name here'
                        value={officerData['Last Name'] || ''}
                        onChange={f => setLastName(f.target.value)} />
                </label>
                <br/>
                <br/>
                <label>SSN:&nbsp;
                    <input
                        type='text'
                        required='required'
                        placeholder='###-##-####'
                        value={officerData['SSN'] || ''}
                        onChange={f => setSSN(f.target.value)} />
                </label>
                &nbsp;&nbsp;
                <label>Date of Birth:&nbsp;
                    <input
                        type='date'
                        required='required'
                        value={officerData['Date of Birth'] || ''}
                        onChange={f => setDOB(f.target.value)} />
                </label>
                &nbsp;&nbsp;
                <label>Address:&nbsp;
                    <input
                        type='text'
                        value={officerData['Address'] || ''}
                        onChange={f => setAddress(f.target.value)} />
                </label>
                <br/>
                <br/>
                <label>Email:&nbsp;
                    <input
                        type='text'
                        value={officerData['Email'] || ''}
                        onChange={f => setEmail(f.target.value)} />
                </label>
                &nbsp;&nbsp;
                <label>Status:&nbsp;
                    <select
                        type='text'
                        required='required'
                        value={officerData['Active Status'] || ''}
                        onChange={f => setIsActive(f.target.value)}>
                            <option value='1'>Active</option> 
                            <option value='0'>Inactive</option>
                    </select>
                </label>
                <br/>
                <br/>
                <div className='update-button'>
                    <button>Save</button>
                </div>
            </fieldset>
        </div>
    );
}

export default OfficerForm;