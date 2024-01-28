import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import watchLaterSlice from '../data/watchLaterSlice'
import Movie from '../components/Movie'
import { HOME } from '../constants/routes'
import { useCallback } from 'react'
import Grid from '../components/Grid'
import '../styles/views/watchLater.scss'

const WatchLater = ({ viewTrailer }) => {
  const dispatch = useDispatch()
  const { watchLaterMovies } = useSelector((state) => state.watchLater)
  const { removeAllWatchLater } = watchLaterSlice.actions
  const watchLaterIsNotEmpty = watchLaterMovies.length > 0

  const handleRemoveAllWatchLater = useCallback(() => {
    dispatch(removeAllWatchLater())
  }, [dispatch, removeAllWatchLater])

  return (
    <div className='watch-later' data-testid='watch-later-div'>
      {watchLaterIsNotEmpty && (
        <div data-testid='watch-later-movies'>
          <h6 className='header'>Watch Later List</h6>
          <Grid>
            {watchLaterMovies.map((movie) => (
              <Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} />
            ))}
          </Grid>
          <footer className='text-center'>
            <button className='btn btn-primary' onClick={handleRemoveAllWatchLater}>
              Empty list
            </button>
          </footer>
        </div>
      )}

      {!watchLaterIsNotEmpty && (
        <div className='text-center empty-cart'>
          <i className='bi bi-heart' />
          <p>You have no movies saved to watch later.</p>
          <p>
            Go to <Link to={HOME}>Home</Link>
          </p>
        </div>
      )}
    </div>
  )
}

export default WatchLater
