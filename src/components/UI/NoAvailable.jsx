import React from 'react'
import '../../styles/components/UI/noAvailable.scss'

function NoAvailable() {
  return (
    <div data-testid='no-available' className='no-available'>
      <h6>no trailer available. Try another movie</h6>
    </div>
  )
}

export default NoAvailable
