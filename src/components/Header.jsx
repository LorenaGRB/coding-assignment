import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import '../styles/components/header.scss'
import { HOME, STARRED, WATCH_LATER } from '../constants/routes'

const Header = ({ searchMovies }) => {
  const { starredMovies } = useSelector((state) => state.starred)

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
