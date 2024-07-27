import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Segment = (props) => {

    const [Segment, setSegment] = useState(null)
    const segments = props.data
    const {segmentId} = useParams()
    const id = Number(segmentId)

    useEffect(() => {
        if (id && segments[id]) {
          setSegment(segments[id]);
        }
      }, [id, segments])

    console.log('Segment: ',Segment)

    if(Segment===null)
        return (
            <div>
            ABC{id}
            </div>
        )
    else
        return(
            <div className="container-fluid">
                <div className='row'>
                    <div className='col-12 p-0 homepage-container'>
                        <header className="app-header bg-primary text-light py-3 px-2">
                            <h1 className='fs-4 px-2 py-1 m-0' role='button' onClick={()=>window.history.back()}><i className="bi bi-chevron-left"></i> Segments</h1>
                        </header>
                        <div className='text-center'>
                            <p className='m-0 my-3 fs-5'><b className='fs-4 text-primary me-3'>SEGMENT:</b> {Segment.segmentName}</p>
                            <div className='d-flex flex-wrap justify-content-center align-items-center'>
                                <p className='m-0 fw-bold fs-4 text-primary'>SCHEMA:</p>
                                <div>
                                    {Segment.finalSchemas.map((data, i)=>{
                                            return(
                                                <div className='border mx-5 p-2' key={i}>
                                                    <span className='fs-5'>{i+1}) </span><span className='fw-bold fs-4 text-primary'>{data[0]}</span> : <span className='fs-5'>{data[1]}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default Segment
