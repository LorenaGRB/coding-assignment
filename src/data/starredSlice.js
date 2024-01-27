import { createSlice } from '@reduxjs/toolkit'
import { STARRED_SLICE } from '../constants/general'

const starredSlice = createSlice({
  name: STARRED_SLICE,
  initialState: {
    starredMovies: []
  },
  reducers: {
    starMovie: (state, action) => {
      state.starredMovies = [action.payload, ...state.starredMovies]
    },
    unstarMovie: (state, action) => {
      const indexOfId = state.starredMovies.findIndex((key) => key.id === action.payload.id)
      state.starredMovies.splice(indexOfId, 1)
    },
    clearAllStarred: (state) => {
      state.starredMovies = []
    }
  }
})

export default starredSlice
