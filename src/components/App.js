import { useEffect, useState } from 'react';
import '../css/App.css';
import '../css/main.css';
import Popup from './Popup';


function App() {

  const [popupStatus, setPopupStatus] = useState(false)
  const [webhookData, setWebhookData] = useState(null)

  useEffect(()=>{
    fetch('https://cors-anywhere.herokuapp.com/https://webhook.site/token/9a91f094-64f6-4960-9f4f-3c9d1a937d3b/requests', {
      method: 'GET',
      headers: {
          Accept:'application/json',
          'Content-Type':'application/json',
      }
    })
    .then((resp) => resp.json())
    .then((data) => {
        alert('Data alert')

        console.log('Received Data: ',data)
  
        console.log('Received Data content: ',data.data)

        // const receivedData = data.data

        // if(receivedData.length>0){
        //   if(receivedData.length>1){
        //     const receivedDataArr = data.data
        //     receivedDataArr
        //   }else{
        //     setWebhookData(data.data[0].content)
        //   }
        // }else{
        //   console.log('No Data found from Web Hook')
        //   setWebhookData({})
        // }
  
    }).catch((error)=>{
        alert('Err Occ')
        console.log('Error in getting the items from the Server:',error)
        if (error.response) {
          console.log('Response:', error.response);
          console.log('Status:', error.response.status);
          console.log('Headers:', error.response.headers);
        }
    })
  },[])

  console.log('Data Webhook: ',webhookData)

  return (
    <div className="container-fluid">
      <div className='row'>
        <div className='col-12 p-0 homepage-container'>
          <header className="app-header bg-primary text-light py-3 px-2">
            <h1 className='fs-4 px-2 py-1 m-0' role='button'><i className="bi bi-chevron-left"></i> View Audience</h1>
          </header>
          <div className='d-flex justify-content-center align-items-center py-3'>
            <button type='button' className='btn btn-outline-primary' onClick={()=>setPopupStatus(true)}>Save segment</button>
          </div>
          { popupStatus &&
            <div className='popup-parent-container d-flex justify-content-end'>
              <Popup popupStatus={setPopupStatus} />
            </div>
          }
          <div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
