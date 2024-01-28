import Grid from '../components/Grid'
import Movie from '../components/Movie'

const Movies = ({ movies, viewTrailer, closeCard }) => {
  return (
    <div data-testid='movies'>
      <Grid>
        {movies.movies.results?.map((movie) => {
          return <Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} closeCard={closeCard} />
        })}
      </Grid>
    </div>
  )
}

export default Movies
