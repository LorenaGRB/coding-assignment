import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAllMovies } from '../data/moviesSlice'
import Header from './Header'
import ModalPlayer from './ModalPlayer'
import '../styles/components/layout.scss'

const Layout = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllMovies())
  }, [dispatch])

  return (
    <div className='layout'>
      <Header />
      <div className='container'>
        <ModalPlayer />
        {children}
      </div>
    </div>
  )
}

export default Layout
