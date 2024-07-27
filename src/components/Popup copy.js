import React, { useEffect, useState } from 'react'

const Popup = (props) => {

    // For storing the Segment Name Input Data
    const [segmentName, setSegmentName] = useState('Name of the segment')

    // For storing the selected New Schema
    const [tempSchema, setTempSchema] = useState('Add schema to segment')

    // For storing the list of saved Schemas in object
    const [schemaStatus, setSchemaStatus] = useState({
            "first_name": false,
            "last_name": false,
            "gender": false,
            "age": false,
            "account_name": false,
            "city": false,
            "state": false,
    })


    // For storing the list of stored schemas in array -> For rendering based on condition
    const [schema, setSchema] = useState([])

    useEffect(()=>{
        // Converting the Object into Array for achieving the validation
        const SchemaArray = Object.entries(schemaStatus).filter(
            ([, value])=> value === true
        )
        setSchema(SchemaArray)

        // Checking for existing Schema
        const checkValidSchema = Object.values(schemaStatus).some(data=>data===true)
        if(checkValidSchema){
            setIsValidSchema(true)
        }else{
            setIsValidSchema(false)
        }
    },[schemaStatus])

    console.log('schema: ',schema)


    const transformKey = (key) => {
        return key.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }

    const transformLabel = (key) => {
        return key.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }

    const convertFinal = () => {
        const resultOjb ={}
        schema.forEach(data=>{
            resultOjb[data[0]]=transformKey(data[0])
        })
        return resultOjb
    }

    console.log('Final Obj: ',convertFinal())

    // To set the form validity
    const [formValidated, setFormValidated] = useState(false)

    // To set the temp schema validity
    const [isValidSchema, setIsValidSchema] = useState(false)


    // To handle the existing schema updation
    const handleSchemaUpdate = (selectedOption, prevOption) => {
        setSchemaStatus((prev)=>({
            ...prev,
            [selectedOption]: true,
            [prevOption]: false
        }))
    }

    // To handle the removal of existing schema
    const handleSchemaRemoval = (selectedOption) => {
        setSchemaStatus((prev)=>({
            ...prev, [selectedOption]: false
        }))
    }

    // To update new Schema on clicking + Add new schema button
    const UpdateSchema = () => {
        setTempSchema("Add schema to segment")
        const selectedOption = tempSchema
        setSchemaStatus((prev)=>({
            ...prev, [selectedOption]: true
        }))
    }

    // Function to handle when submitting all the changes - on clicking the Save the Segment button.
    const handleSubmit = (e) => {
        alert('func called')
        e.preventDefault();
        setFormValidated(true);

        const isValidSegmentName = segmentName !== 'Name of the segment';
        const isValidTempSchema = tempSchema === 'Add schema to segment'
        const isValidSchema = Object.values(schemaStatus).some(data=>data===true)


        if (isValidSegmentName && isValidSchema && isValidTempSchema) {
            alert('Submitted Data');
            setFormValidated(false); // Reset validation after successful submission
        }
        else
            alert('Please fill in all the detials')    
    }


  return (
    <div className='popup-container bg-light'>
      <div className='bg-primary py-3 px-2 text-light'>
        <h2 onClick={()=>{props.popupStatus(false);window.history.back()}} className='fs-4 px-2 py-1 m-0' role='button'><i className="bi bi-chevron-left"></i> Saving Segment</h2>
      </div>
      <div className='py-4 px-3'>
        <form className={`needs-validation ${formValidated ? 'was-validated' : ''}`} noValidate onSubmit={(e)=>handleSubmit(e)}>
            <label className='my-3 form-label' htmlFor='segment-name'>Enter the Name of the Segment</label>
            <input className={`w-100 px-3 py-2 ${segmentName === 'Name of the segment' ? 'is-invalid' : ''}`} type='text' placeholder='Name of the segment' value={segmentName} onChange={(e) => setSegmentName(e.target.value)} id='segment-name' required />
            <div className="invalid-feedback">
                <i className="bi bi-exclamation-triangle"></i> Please enter the Segment name.
            </div>
            <p className='my-3'>To save your segment, you need to add the schemas to build the query</p>
            <div className='my-3 d-flex justify-content-end'>
                <span className='m-2'>
                    <i className="bi bi-circle-fill text-success"></i> - User Traits
                </span>
                <span className='m-2'>
                    <i className="bi bi-circle-fill text-danger"></i> - Group Traits
                </span>
            </div>



            <div className='my-3'>
                
                {
                    schema.map(([propKeypair, propValue], i)=>{
                        return(
                            <div key={i} className='m-2'>
                            {(propValue===true) && <div className='d-flex align-items-center justify-content-evenly w-100'>
                                <i className="bi bi-circle-fill text-success dropdown-indicator"></i>
                                <div className='dropdown-option'>
                                    <select className={`px-3 py-2 fs-5 w-100 ${propKeypair !== 'Add schema to segment' ? 'is-valid' : 'is-invalid'}`} value={()=>transformLabel(propKeypair)} onChange={(e)=>handleSchemaUpdate(e.target.value, propKeypair)} required>
                                        <option disabled value={propKeypair}>{propKeypair}</option>
                                        {schemaStatus.first_name===false && <option value='first_name' >First Name</option>}
                                        {schemaStatus.last_name===false && <option value='last_name' >Last Name</option>}
                                        {schemaStatus.gender===false && <option value='gender' >Gender</option>}
                                        {schemaStatus.age===false && <option value='age' >Age</option>}
                                        {schemaStatus.account_name===false && <option value='account_name' >Account Name</option>}
                                        {schemaStatus.city===false && <option value='city' >City</option>}
                                        {schemaStatus.state===false && <option value='state' >State</option>}
                                    </select>
                                    <div className="invalid-feedback">
                                        <i className="bi bi-exclamation-triangle"></i> Please select a valid schema.
                                    </div>
                                </div>
                                <i className="bi bi-dash-square-fill text-secondary fs-3 dropdown-delete-icon" role='button' onClick={()=>handleSchemaRemoval(propKeypair)}></i>
                            </div>}
                            </div>
                        )}
                    )
                }

                



            </div>

            {/* <hr className='my-4'/> */}

            <div className='my-3'>
                <div className='d-flex align-items-center justify-content-evenly w-100'>
                    {tempSchema !== 'Add schema to segment' && <i className="bi bi-circle-fill text-danger dropdown-indicator"></i>}
                    <div className='dropdown-option'>
                        <select className={`px-3 py-2 fs-5 w-100 ${(formValidated&&isValidSchema) ? 'is-valid' : 'is-invalid'}`} value={tempSchema} onChange={(e) => setTempSchema(e.target.value)} required={isValidSchema===false}>
                            <option disabled value="Add schema to segment">Add schema to segment</option>
                            {schemaStatus.first_name===false && <option value='first_name'>First Name</option>}
                            {schemaStatus.last_name===false && <option value='last_name'>Last Name</option>}
                            {schemaStatus.gender===false && <option value='gender'>Gender</option>}
                            {schemaStatus.age===false && <option value='age'>Age</option>}
                            {schemaStatus.account_name===false && <option value='account_name'>Account Name</option>}
                            {schemaStatus.city===false && <option value='city'>City</option>}
                            {schemaStatus.state===false && <option value='state'>State</option>}
                        </select>
                        <div className='invalid-feedback'>
                            {(tempSchema==="Add schema to segment" && isValidSchema===false) && <><i className="bi bi-exclamation-triangle"></i> Please select the required schema and click on the below <b>+ Add new schema</b> button.</>}
                        </div>
                        <div className='invalid-feedback'>
                            {(tempSchema!=="Add schema to segment") && <>
                                <i className="bi bi-exclamation-triangle"></i> Save the selected schema by clicking on the below <b>+ Add new schema</b> button (or) Remove the Selected Schema by clicking <i className="bi bi-dash-square-fill dropdown-delete-icon"></i>.</>}
                        </div>
                    </div>
                    {tempSchema!=='Add schema to segment' && <i className="bi bi-dash-square-fill text-secondary fs-3 dropdown-delete-icon" onClick={()=>setTempSchema('Add schema to segment')}></i>}
                </div>
            </div>

            <u role='button' className='my-3 text-success link-offset-2' style={{ cursor: tempSchema === "Add schema to segment" ? 'not-allowed' : 'pointer' }} onClick={()=>{(tempSchema!=="Add schema to segment")&&UpdateSchema()}}>+ Add new schema</u>

            <div className='mt-5 my-3'>
                <button type='submit' className='btn btn-success m-2 rounded-1'>Save the Segment</button>
                <button className='btn btn-outline-danger m-2 rounded-1' onClick={()=>window.history.back()}>Cancel</button>
            </div>

        </form>
      </div>
    </div>
  )
}

export default Popup
