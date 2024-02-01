import Grid from '../components/UI/Grid'
import { useDispatch, useSelector } from 'react-redux'
import Movie from '../components/Movie'
import { useCallback, useRef } from 'react'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import { fetchAllMovies } from '../data/moviesSlice'
import '../styles/views/movies.scss'

const Movies = () => {
  const { movies } = useSelector((state) => state)
  const moviesRef = useRef()
  const dispatch = useDispatch()
  const loadMoreMovies = useCallback(
    (page) => {
      dispatch(fetchAllMovies({ page }))
    },
    [dispatch]
  )
  const isSearching = !!movies.searchMovies[0]
  useInfiniteScroll(isSearching ? () => {} : loadMoreMovies, moviesRef)
  const moviesToRender = isSearching ? movies.searchMovies : movies.movies
  return (
    <div ref={moviesRef} data-testid='movies' className='movies'>
      <Grid>
        {moviesToRender?.map((movie) => {
          return <Movie movie={movie} key={movie.id} />
        })}
      </Grid>
    </div>
  )
}

export default Movies
