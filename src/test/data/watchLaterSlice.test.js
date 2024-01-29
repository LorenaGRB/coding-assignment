import watchLaterSlice from '../../data/watchLaterSlice'
import { moviesMock } from '../utils/movies.mocks'

describe('watchLaterSlice test', () => {
  const state = { watchLaterMovies: [] }
  const mock = moviesMock.results
  it('should set initial state', () => {
    const initialState = state
    const action = { type: '' }
    const result = watchLaterSlice.reducer(initialState, action)
    expect(result).toEqual({ watchLaterMovies: [] })
  })

  it('should add movie to watch later', () => {
    const initialState = { ...state, watchLaterMovies: [] }
    const action = watchLaterSlice.actions.addToWatchLater(mock[0])
    const result = watchLaterSlice.reducer(initialState, action)
    expect(result.watchLaterMovies[0]).toBe(mock[0])
  })

  it('should remove movie from watch later', () => {
    const initialState = { ...state, watchLaterMovies: mock }
    const action = watchLaterSlice.actions.removeFromWatchLater(mock[0])
    const result = watchLaterSlice.reducer(initialState, action)
    expect(result.watchLaterMovies[0]).toBe(mock[1])
  })

  it('should remove all movies', () => {
    const initialState = { ...state, watchLaterMovies: mock }
    const action = watchLaterSlice.actions.removeAllWatchLater(state)
    const result = watchLaterSlice.reducer(initialState, action)
    expect(Object.keys(result.watchLaterMovies).length).toEqual(0)
  })
})
