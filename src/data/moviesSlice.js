import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ERROR, LOADING, MOVIES_SLICE, SUCCESS } from '../constants/general'
import { getMovies } from '../api/movie'
import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from '../constants/endpoints'

export const fetchMovies = createAsyncThunk('fetch-movies', async (searchQuery) => {
  let endpoint = ENDPOINT_DISCOVER
  let params = {
    sort_by: 'vote_count.desc'
  }
  if (searchQuery && searchQuery !== '') {
    endpoint = ENDPOINT_SEARCH
    params = {
      query: searchQuery
    }
  }
  return await getMovies(endpoint, params)
})

const moviesSlice = createSlice({
  name: MOVIES_SLICE,
  initialState: {
    movies: [],
    fetchStatus: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload
        state.fetchStatus = SUCCESS
      })
      .addCase(fetchMovies.pending, (state) => {
        state.fetchStatus = LOADING
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.fetchStatus = ERROR
      })
  }
})

export default moviesSlice
