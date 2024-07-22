import { useState } from 'react';
import '../css/App.css';
import '../css/main.css';
import Popup from './Popup';


function App() {

  const [popupStatus, setPopupStatus] = useState(false)

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
        </div>
      </div>
    </div>
  );
}

export default App;
