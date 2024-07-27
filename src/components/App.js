import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../css/App.css';
import '../css/main.css';
import Home from './Home';
import Segment from './Segment';


function App() {

  const [webhookData, setWebhookData] = useState([])

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
        console.log('check text: ', text)
        const data = JSON.parse(text)
        try {
          alert('Data alert')
          console.log('Received Data: ', data)

          const receivedData = data.data

          if (receivedData.length > 0) {
            const contentArrays = receivedData.map((element) => {
              try {
                // Parse the content field as JSON
                return JSON.parse(element.content);
              } catch (error) {
                console.error('Error parsing content:', error);
                return null; // Handle parsing errors gracefully
              }
            }).filter(item => item !== null); // Filter out any parsing errors

            console.log('data.data length > 0');
            setWebhookData(contentArrays);
          }
          else {
            console.log('data.data length lesser than or equals 0')
            console.log('No Data found from Web Hook')
            setWebhookData({})
          }
        } catch (err) {
          console.log('Err found on JSON Parse: ', err)
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

  return(
    <>
      <Routes>
        <Route path="/" element={<Home data={webhookData} />}/>
        <Route path="/segment/:segmentId" element={<Segment data={webhookData} />}/>
      </Routes>
    </>
  )
}

export default App;
