import React, { useState } from 'react'
import placeholder from '../assets/not-found-500X750.jpeg'
import '../styles/components/card.scss'

const Card = ({ children, imageLink, title }) => {
  const [isOpen, setIsOpen] = useState('')

  const handleCardClick = (value, event) => {
    event?.stopPropagation()
    setIsOpen(value)
  }
  return (
    <div className='card-wrapper'>
      <div className={`card ${isOpen}`} onClick={() => handleCardClick('opened')}>
        <div className='card-body'>
          <div className='overlay' />
          <div className='info_panel'>{children}</div>
          <img className='center-block' src={imageLink ?? placeholder} alt='Movie poster' />
        </div>
        <h6 className='title mobile-card'>{title}</h6>
        <h6 className='title'>{title}</h6>
        <button type='button' className='close' onClick={(e) => handleCardClick('', e)} aria-label='Close'>
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
    </div>
  )
}

export default Card
