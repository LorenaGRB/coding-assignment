import { createSlice } from '@reduxjs/toolkit'
import { WATCH_LATER_SLICE } from '../constants/general'

const watchLaterSlice = createSlice({
  name: WATCH_LATER_SLICE,
  initialState: {
    watchLaterMovies: []
  },
  reducers: {
    addToWatchLater: (state, action) => {
      state.watchLaterMovies = [action.payload, ...state.watchLaterMovies]
    },
    removeFromWatchLater: (state, action) => {
      state.watchLaterMovies = state.watchLaterMovies.filter((movie) => movie.id !== action.payload.id)
    },
    removeAllWatchLater: (state) => {
      state.watchLaterMovies = []
    }
  }
})

export default watchLaterSlice
