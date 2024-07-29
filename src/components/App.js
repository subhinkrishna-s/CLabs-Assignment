import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../css/App.css';
import '../css/main.css';
import Home from './Home';
import Segment from './Segment';
import Loader from './Loader';
import Footer from './Footer';


function App() {

  const [webhookData, setWebhookData] = useState(null)

  useEffect(() => {
    fetch('https://cors-anywhere.herokuapp.com/https://webhook.site/token/9a91f094-64f6-4960-9f4f-3c9d1a937d3b/requests', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'origin': 'http://localhost:3000',
        'x-requested-with': 'XMLHttpRequest'
      }
    })
      .then((resp) => resp.text())
      .then((text) => {
        if(!text){
          throw new Error('Empty text Response')
        }
        
        try {
          const data = JSON.parse(text)

          const receivedData = data.data

          if(receivedData && receivedData.length>0){
            const contentArrays = receivedData.filter(item=>item.content!=='')
            .map((e)=>{
              return JSON.parse(e.content)
            })
            setWebhookData(contentArrays)
          }else
            setWebhookData({})
        } catch (err) {
          console.log('Err found on JSON Parse: ', err)
          alert('Please click on the "Request temporary access to the demo server" button')
          window.open("https://cors-anywhere.herokuapp.com/corsdemo", "_blank");
        }
      }).catch((error) => {
        alert('Err Occ')
        console.log('Error in getting the items from the Server:', error)
        if (error.response) {
          console.log('Response:', error.response);
          console.log('Status:', error.response.status);
          console.log('Headers:', error.response.headers);
        }
      })
    }, [])

    if(webhookData!==null){
      return(
        <>
          <Routes>
            <Route path="/" element={<Home data={webhookData} />}/>
            <Route path="/segment/:segmentId" element={<Segment data={webhookData} />}/>
          </Routes>
          <Footer/>
        </>
      )
    }else{
      return(
        <>
          <Loader/>
        </>
      )
    }


}

export default App;
