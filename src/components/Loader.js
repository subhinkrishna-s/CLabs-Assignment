import React from 'react'
import Footer from './Footer'

const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
        <div className='text-center'>
          <figure>
            <blockquote className="blockquote">
              <p>Schema Management for <span className='fw-bold text-primary'>CUSTOMER LABS</span></p>
            </blockquote>
            <figcaption className="blockquote-footer">
              Developed by <cite title="Source Title" className='fw-bolder text-dark'>Subhin Krishna S</cite>
            </figcaption>
          </figure>
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border text-primary fs-3" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Loader
