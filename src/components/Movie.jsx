import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import starredSlice from '../data/starredSlice'
import watchLaterSlice from '../data/watchLaterSlice'
import { IMAGE_URL } from '../constants/links'
import Card from './Card'
import { useModal } from '../contexts/ModalContext'
import '../styles/components/movie.scss'

const Movie = ({ movie }) => {
  const { openModal } = useModal()
  const { starred, watchLater } = useSelector((state) => state)
  const { starMovie, unstarMovie } = starredSlice.actions
  const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions

  const dispatch = useDispatch()

  const isStarred = useMemo(() => {
    return starred.starredMovies.some((starredMovie) => starredMovie.id === movie.id)
  }, [starred.starredMovies, movie.id])

  const isWatchLater = useMemo(() => {
    return watchLater.watchLaterMovies.some((watchLaterMovie) => watchLaterMovie.id === movie.id)
  }, [watchLater.watchLaterMovies, movie.id])

  const handleStarClick = () => {
    if (isStarred) {
      dispatch(unstarMovie(movie))
    } else {
      dispatch(
        starMovie({
          id: movie.id,
          overview: movie.overview,
          release_date: movie.release_date?.substring(0, 4),
          poster_path: movie.poster_path,
          title: movie.title
        })
      )
    }
  }

  const handleWatchLaterClick = () => {
    if (isWatchLater) {
      dispatch(removeFromWatchLater(movie))
    } else {
      dispatch(
        addToWatchLater({
          id: movie.id,
          overview: movie.overview,
          release_date: movie.release_date?.substring(0, 4),
          poster_path: movie.poster_path,
          title: movie.title
        })
      )
    }
  }

  return (
    <Card imageLink={movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : null} title={movie.title}>
      <div className='movie__overview'>{movie.overview}</div>
      <div className='movie__year'>{movie.release_date?.substring(0, 4)}</div>
      <span className='btn-star' data-testid='star-link' onClick={handleStarClick}>
        <i className={`bi ${isStarred ? 'bi-star-fill' : 'bi-star'}`} />
      </span>
      <button
        type='button'
        data-testid={isWatchLater ? 'remove-watch-later' : 'watch-later'}
        className={`btn btn-light btn-watch-later ${isWatchLater ? 'blue' : ''}`}
        onClick={handleWatchLaterClick}
      >
        {isWatchLater ? <i className='bi bi-check'></i> : 'Watch Later'}
      </button>
      <button type='button' className='btn btn-dark' onClick={() => openModal(movie)}>
        View Trailer
      </button>
    </Card>
  )
}

export default Movie
