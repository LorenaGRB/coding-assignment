import { Link, NavLink, createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { HOME, STARRED, WATCH_LATER } from '../constants/routes'
import '../styles/components/header.scss'
import moviesSlice, { fetchSearchMovies } from '../data/moviesSlice'
import { useCallback, useState } from 'react'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [, setSearchParams] = useSearchParams()
  const { clearSearchMovies } = moviesSlice.actions
  const { starredMovies } = useSelector((state) => state.starred)
  const [inputValue, setInputValue] = useState('')

  const searchMovies = useCallback(
    (movieToSearch) => {
      navigate(HOME)
      if (movieToSearch !== '') {
        setSearchParams(createSearchParams({ search: movieToSearch }))
        dispatch(fetchSearchMovies({ search: movieToSearch }))
      } else {
        setInputValue('')
        setSearchParams()
        dispatch(clearSearchMovies())
      }
    },
    [dispatch, navigate, setSearchParams, clearSearchMovies]
  )
  return (
    <header>
      <Link to={HOME} data-testid='home' onClick={() => searchMovies('')}>
        <i className='bi bi-film' />
      </Link>

      <nav>
        <NavLink to={STARRED} data-testid='nav-starred' className='nav-starred'>
          {starredMovies.length > 0 ? (
            <>
              <i className='bi bi-star-fill bi-star-fill-white' />
              <sup className='star-number'>{starredMovies.length}</sup>
            </>
          ) : (
            <i className='bi bi-star' />
          )}
        </NavLink>
        <NavLink to={WATCH_LATER} className='nav-fav'>
          watch later
        </NavLink>
      </nav>

      <div className='input-group rounded'>
        <Link to={HOME} onClick={(e) => searchMovies('')} className='search-link'>
          <input
            type='search'
            data-testid='search-movies'
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyUp={(e) => searchMovies(e.target.value)}
            className='form-control rounded'
            placeholder='Search movies...'
            aria-label='Search movies'
            aria-describedby='search-addon'
          />
        </Link>
      </div>
    </header>
  )
}

export default Header
