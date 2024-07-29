import React from 'react'
import { useState } from 'react';
import Popup from './Popup';
import Loader from './Loader';

const Home = (props) => {

  const [popupStatus, setPopupStatus] = useState(false)

  const webhookData = props.data

  if(webhookData!==null){
  return (
    <div className="container-fluid">
      <div className='row'>
        <div className='col-12 p-0 homepage-container'>
          <header className="app-header bg-primary text-light py-3 px-2">
            <h1 className='fs-4 px-2 py-1 m-0' role='button' onClick={()=>window.open('https://subhinkrishna.vercel.app/','_blank')}><i className="bi bi-chevron-left"></i> View Audience</h1>
          </header>
          <div className='d-flex justify-content-center align-items-center py-3'>
            <button type='button' className='btn btn-outline-primary' onClick={() => setPopupStatus(true)}>Save segment</button>
          </div>
          {popupStatus &&
            <div className='popup-parent-container d-flex justify-content-end'>
              <Popup popupStatus={setPopupStatus} />
            </div>
          }
          <div className="table-responsive m-2 border border-5">
            <h2 className='fs-3 py-2 text-center'><u>Available Segments</u></h2>
            <div className='dashboard-table'>
              <table className="table">
                {(webhookData.length < 1) && <caption className='text-center'>No Segments found!</caption>}
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Segment Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    (webhookData.length > 0) ? webhookData.map((data, i) => {
                      return (
                        <tr key={i}>
                          <th scope="row">{i + 1}</th>
                          <td>{data.segmentName}</td>
                          <td><a href={`/segment/${i}`}>View</a></td>
                        </tr>
                      )
                    })
                    :
                    <tr>
                      <td colSpan='3' className='text-center'><em>No Data found! Create new by clicking the <b>Save Segment</b> button.</em></td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  }else{
    return(
      <>
        <Loader/>
      </>
    )
  }
}

export default Home
