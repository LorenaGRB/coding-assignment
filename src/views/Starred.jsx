import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import starredSlice from '../data/starredSlice'
import Movie from '../components/Movie'
import { HOME } from '../constants/routes'
import '../styles/views/starred.scss'
import Grid from '../components/Grid'

const Starred = () => {
  const { starred } = useSelector((state) => state)
  const { clearAllStarred } = starredSlice.actions
  const dispatch = useDispatch()

  return (
    <div className='starred' data-testid='starred'>
      {starred.starredMovies.length > 0 && (
        <div data-testid='starred-movies' className='starred-movies'>
          <h6 className='header'>Starred movies</h6>
          <Grid>
            {starred.starredMovies.map((movie) => (
              <Movie movie={movie} key={movie.id} />
            ))}
          </Grid>

          <footer className='text-center'>
            <button className='btn btn-primary' onClick={() => dispatch(clearAllStarred())}>
              Remove all starred
            </button>
          </footer>
        </div>
      )}

      {starred.starredMovies.length === 0 && (
        <div className='text-center empty-cart'>
          <i className='bi bi-star' />
          <p>There are no starred movies.</p>
          <p>
            Go to <Link to={HOME}>Home</Link>
          </p>
        </div>
      )}
    </div>
  )
}

export default Starred
