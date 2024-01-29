import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ERROR, LOADING, MOVIES_SLICE, SUCCESS } from '../constants/general'
import { getMovies } from '../api/movie'
import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from '../constants/endpoints'

export const fetchAllMovies = createAsyncThunk('fetch-all-movies', async (query) => {
  const params = {
    page: query?.page ?? 1,
    sort_by: 'vote_count.desc'
  }
  return await getMovies(ENDPOINT_DISCOVER, params)
})

export const fetchSearchMovies = createAsyncThunk('fetch-search-movies', async (query) => {
  const params = {
    query: query.search,
    sort_by: 'vote_count.desc'
  }
  return await getMovies(ENDPOINT_SEARCH, params)
})

const moviesSlice = createSlice({
  name: MOVIES_SLICE,
  initialState: {
    movies: [],
    searchMovies: [],
    moviesStatus: '',
    searchMoviesStatus: ''
  },
  reducers: {
    clearSearchMovies: (state) => {
      state.searchMovies = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMovies.fulfilled, (state, action) => {
        const existingMovieIds = new Set(state.movies.map((movie) => movie.id))
        const newMovies = action.payload.results.filter((newMovie) => !existingMovieIds.has(newMovie.id))
        state.movies = state.movies.concat(newMovies)
        state.moviesStatus = SUCCESS
      })
      .addCase(fetchAllMovies.pending, (state) => {
        state.moviesStatus = LOADING
      })
      .addCase(fetchAllMovies.rejected, (state) => {
        state.moviesStatus = ERROR
      })
      .addCase(fetchSearchMovies.fulfilled, (state, action) => {
        state.searchMovies = action.payload.results
        state.moviesStatus = SUCCESS
      })
      .addCase(fetchSearchMovies.pending, (state) => {
        state.searchMoviesStatus = LOADING
      })
      .addCase(fetchSearchMovies.rejected, (state) => {
        state.searchMoviesStatus = ERROR
      })
  }
})

export default moviesSlice
