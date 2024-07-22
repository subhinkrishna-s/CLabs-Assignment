import React, { useEffect, useState } from 'react'

const Popup = (props) => {

    const [segmentName, setSegmentName] = useState('Name of the segment')
    const [schemaName, setSchemaName] = useState('Add schema to segment')
    const [tempSchema, setTempSchema] = useState('Add schema to segment')


    const [schemaStatus, setSchemaStatus] = useState({
            "first_name": false,
            "last_name": false,
            "gender": false,
            "age": false,
            "account_name": false,
            "city": false,
            "state": false,
    })



    const [schema, setSchema] = useState([])

    const handleSchemaUpdate = (selectedOption) => {
        setSchemaStatus((prev)=>({
            ...prev, [selectedOption]: true
        }))
    }

    const handleSchemaRemoval = (selectedOption) => {
        setSchemaStatus((prev)=>({
            ...prev, [selectedOption]: false
        }))
    }

    const UpdateSchema = () => {
        setTempSchema("Add schema to segment")
        const selectedOption = tempSchema
        setSchemaStatus((prev)=>({
            ...prev, [selectedOption]: true
        }))
    }





    useEffect(()=>{
        const SchemaArray = Object.entries(schemaStatus).filter(
            ([, value])=> value === true
        )
        setSchema(SchemaArray)
    },[schemaStatus])




    console.log('Start Console>>>>>>>>>>>>>>>>>>>>>>>>>>')
    console.log('Segment Name: ',segmentName)
    console.log('Schema Name: ',schemaName)
    console.log('Temp Schema Name: ',tempSchema)
    console.log('Schema Status: ',schemaStatus)
    console.log('Schema: ',schema)
    console.log('End Console>>>>>>>>>>>>>>>>>>>>>>>>>>')


  return (
    <div className='popup-container bg-light'>
      <div className='bg-primary py-3 px-2 text-light'>
        <h2 onClick={()=>{props.popupStatus(false)}} className='fs-4 px-2 py-1 m-0' role='button'><i className="bi bi-chevron-left"></i> Saving Segment</h2>
      </div>
      <div className='py-4 px-3'>
        <form>
            <label className='my-3' htmlFor='segment-name'>Enter the Name of the Segment</label>
            <input className='w-100 px-3 py-2' type='text' placeholder='Name of the segment' value={segmentName} onChange={(e)=>setSegmentName(e.target.value)} id='segment-name' />
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
                        console.log('pai: ',propKeypair," : ",propValue)
                        return(
                            <div key={i}>
                            {(propValue===true) && <div className='d-flex align-items-center justify-content-evenly w-100'>
                                <i className="bi bi-circle-fill text-success dropdown-indicator"></i>
                                <select className='px-3 py-2 fs-5 dropdown-option' value={propKeypair} onChange={(e)=>{setSchemaName(e.target.value);handleSchemaUpdate(e.target.value)}}>
                                    <option disabled value={propKeypair}>{propKeypair}</option>
                                    {schemaStatus.first_name===false && <option value='first_name' >First Name</option>}
                                    {schemaStatus.last_name===false && <option value='last_name' >Last Name</option>}
                                    {schemaStatus.gender===false && <option value='gender' >Gender</option>}
                                    {schemaStatus.age===false && <option value='age' >Age</option>}
                                    {schemaStatus.account_name===false && <option value='account_name' >Account Name</option>}
                                    {schemaStatus.city===false && <option value='city' >City</option>}
                                    {schemaStatus.state===false && <option value='state' >State</option>}
                                </select>
                                <i className="bi bi-dash-square-fill text-secondary fs-3 dropdown-delete-icon" role='button' onClick={()=>handleSchemaRemoval(propKeypair)}></i>
                            </div>}
                            </div>
                        )}
                    )
                }

                



            </div>


            <div className='my-3'>
                <div className='d-flex align-items-center justify-content-evenly w-100'>
                    <i className="bi bi-circle-fill text-danger dropdown-indicator"></i>
                    <select className='px-3 py-2 fs-5 dropdown-option' value={tempSchema} onChange={(e)=>setTempSchema(e.target.value)}>
                        <option disabled value="Add schema to segment">Add schema to segment</option>
                        {schemaStatus.first_name===false && <option value='first_name'>First Name</option>}
                        {schemaStatus.last_name===false && <option value='last_name'>Last Name</option>}
                        {schemaStatus.gender===false && <option value='gender'>Gender</option>}
                        {schemaStatus.age===false && <option value='age'>Age</option>}
                        {schemaStatus.account_name===false && <option value='account_name'>Account Name</option>}
                        {schemaStatus.city===false && <option value='city'>City</option>}
                        {schemaStatus.state===false && <option value='state'>State</option>}
                    </select>
                    <i className="bi bi-dash-square-fill text-light fs-3 dropdown-delete-icon"></i>
                </div>
            </div>

            <u role='button' className='my-3 text-success link-offset-2' style={{ cursor: tempSchema === "Add schema to segment" ? 'not-allowed' : 'pointer' }} onClick={()=>{(tempSchema!=="Add schema to segment")&&UpdateSchema()}}>+ Add new schema</u>



        </form>
        <div className='mt-5 my-3'>
            <button className='btn btn-success m-2 rounded-1'>Save the Segment</button>
            <button className='btn btn-outline-danger m-2 rounded-1'>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default Popup
