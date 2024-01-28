import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { fetchMovies } from '../data/moviesSlice'
import Header from './Header'
import { HOME } from '../constants/routes'
import ModalPlayer from './ModalPlayer'
import '../styles/components/layout.scss'

const Layout = ({ children }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const getSearchResults = (query) => {
    if (query !== '') {
      setSearchParams(createSearchParams({ search: query }))
    } else {
      setSearchParams()
    }
  }

  const searchMovies = (query) => {
    navigate(HOME)
    dispatch(fetchMovies(query))
    getSearchResults(query)
  }

  const getMovies = useCallback(() => {
    const searchQuery = searchParams.get('search')
    dispatch(fetchMovies(searchQuery))
  }, [dispatch, searchParams])

  useEffect(() => {
    getMovies()
  }, [getMovies])

  return (
    <div className='layout'>
      <Header searchMovies={searchMovies} searchParams={searchParams} setSearchParams={setSearchParams} />
      <div className='container'>
        <ModalPlayer />
        {children}
      </div>
    </div>
  )
}

export default Layout
