import Grid from '../components/Grid'
import { useSelector } from 'react-redux'
import Movie from '../components/Movie'

const Movies = () => {
  const { movies } = useSelector((state) => state)
  return (
    <div data-testid='movies'>
      <Grid>
        {movies.movies.results?.map((movie) => {
          return <Movie movie={movie} key={movie.id} />
        })}
      </Grid>
    </div>
  )
}

export default Movies
