import moviesSlice, { fetchAllMovies } from '../../data/moviesSlice'
import { moviesMock } from '../utils/movies.mocks'

describe('MovieSlice test', () => {
  it('should set loading true while action is pending', () => {
    const action = { type: fetchAllMovies.pending }
    const initialState = moviesSlice.reducer(
      {
        movies: [],
        fetchStatus: ''
      },
      action
    )
    expect(action).toEqual({ type: fetchAllMovies.pending })
  })

  it('should return payload when action is fulfilled', () => {
    const action = {
      type: fetchAllMovies.fulfilled,
      payload: moviesMock
    }
    const initialState = moviesSlice.reducer(
      {
        movies: [],
        fetchStatus: ''
      },
      action
    )
    expect(action.payload).toBeTruthy()
  })

  it('should set error when action is rejected', () => {
    const action = { type: fetchAllMovies.rejected }
    const initialState = moviesSlice.reducer(
      {
        movies: [],
        fetchStatus: ''
      },
      action
    )
    expect(action).toEqual({ type: fetchAllMovies.rejected })
  })
})
