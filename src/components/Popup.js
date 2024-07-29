import React, { useEffect, useState } from 'react'

const Popup = (props) => {

    // For storing the Segment Name Input Data
    const [segmentName, setSegmentName] = useState('Name of the segment')

    // For storing the selected New Schema
    const [tempSchema, setTempSchema] = useState('Add schema to segment')

    // To set the form validity
    const [formValidated, setFormValidated] = useState(false)

    // To check Schema's availability
    const [isValidSchema, setIsValidSchema] = useState(false)

    // To handle the submission loading on button
    const [submitStatus, setSubmitStatus] = useState(false)

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


    useEffect(()=>{
        const ValidSchema = Object.values(schemaStatus).some(data=>data===true)
        setIsValidSchema(ValidSchema)
    },[schemaStatus])


    const transformKey = (key) => {
        return key.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }

    const convertFinal = () => {
        const resultOjb ={}

        Object.entries(schemaStatus).forEach(([propKeypair, propValue])=>{
            if(propValue===true)
                resultOjb[propKeypair]=transformKey(propKeypair)
        })
        
        return resultOjb
    }




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

        e.preventDefault();
        setSubmitStatus(true)
        setFormValidated(true);

        const finalObject = convertFinal()
        const finalSchemas = Object.entries(finalObject)
        const isValidSegmentName = segmentName !== 'Name of the segment';
        const isValidTempSchema = tempSchema === 'Add schema to segment'

        const sendData = {
            segmentName,
            finalSchemas
        }


        if (isValidSegmentName && isValidTempSchema && isValidSchema ) {

            setFormValidated(false); // Reset validation after successful submission

            fetch('https://webhook.site/9a91f094-64f6-4960-9f4f-3c9d1a937d3b', {
                method: 'POST',
                headers: {
                    Accept:'application/form-data',
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(sendData),
            })
            .then((resp) => resp.text())
            .then((data) => {
                setSubmitStatus(false)
                setSegmentName('Name of the segment')
                setTempSchema('Add schema to segment')
                setSchemaStatus({
                    "first_name": false,
                    "last_name": false,
                    "gender": false,
                    "age": false,
                    "account_name": false,
                    "city": false,
                    "state": false,
                })
                setFormValidated(false)
                props.popupStatus(false)
                alert('The Segments have been saved successfully!')
                window.location.reload()
            }).catch((error)=>{
                alert('Err Occ')
                console.log('Error in updating the cart items to the Server:',error)
            });
        }
        else
            alert('Please fill in all the detials')    
    }


  return (
    <div className='popup-container bg-light'>
      <div className='bg-primary py-3 px-2 text-light'>
        <h2 onClick={()=>{props.popupStatus(false)}} className='fs-4 px-2 py-1 m-0' role='button'><i className="bi bi-chevron-left"></i> Saving Segment</h2>
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
                    Object.entries(schemaStatus).map(([propKeypair, propValue], i)=>{
                        return(
                            <div key={i} className='m-2'>
                            {(propValue===true) && <div className='d-flex align-items-center justify-content-evenly w-100'>
                                <i className="bi bi-circle-fill text-success dropdown-indicator"></i>
                                <div className='dropdown-option'>
                                    <select className={`px-3 py-2 fs-5 w-100 ${propKeypair !== 'Add schema to segment' ? 'is-valid' : 'is-invalid'}`} value={propKeypair} onChange={(e)=>handleSchemaUpdate(e.target.value, propKeypair)} required>
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
                        <select className={`px-3 py-2 fs-5 w-100 ${(formValidated) ? 'is-valid' : 'is-invalid'}`} value={tempSchema} onChange={(e) => setTempSchema(e.target.value)} required>
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
                            {(tempSchema==="Add schema to segment" && (isValidSchema===false)) && <><i className="bi bi-exclamation-triangle"></i> Please select the required schema and click on the below <b>+ Add new schema</b> button.</>}
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
                {
                    submitStatus?
                    <button className="btn btn-success m-2 rounded-1" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        <span role="status">Submitting...</span>
                    </button>
                    :<button type='submit' className='btn btn-success m-2 rounded-1'>Save the Segment</button>
                }
                <button className='btn btn-outline-danger m-2 rounded-1' onClick={()=>props.popupStatus(false)}>Cancel</button>
            </div>

        </form>
      </div>
    </div>
  )
}

export default Popup
