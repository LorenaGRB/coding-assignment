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
      const indexOfId = state.watchLaterMovies.findIndex((key) => key.id === action.payload.id)
      state.watchLaterMovies.splice(indexOfId, 1)
    },
    remveAllWatchLater: (state) => {
      state.watchLaterMovies = []
    }
  }
})

export default watchLaterSlice
