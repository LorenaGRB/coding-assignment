import React from 'react'
import '../styles/components/loader.scss'

export const Loader = (type) => {
  return (
    <div className='loader-container'>
      <div className='loader-overlay'>
        <div className='loader-content'>
          <div className='loader'></div>
        </div>
      </div>
    </div>
  )
}
