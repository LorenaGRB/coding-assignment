import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ERROR, LOADING, MOVIES_SLICE, SUCCESS } from '../constants/general'

export const fetchMovies = createAsyncThunk('fetch-movies', async (apiUrl) => {
  const response = await fetch(apiUrl)
  return response.json()
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
