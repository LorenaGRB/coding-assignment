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
      state.starredMovies = state.starredMovies.filter((movie) => movie.id !== action.payload.id)
    },
    clearAllStarred: (state) => {
      state.starredMovies = []
    }
  }
})

export default starredSlice
