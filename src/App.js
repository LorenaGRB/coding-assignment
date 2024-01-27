import { useEffect, useState } from 'react'
import { Routes, Route, createSearchParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchMovies } from './data/moviesSlice'
import Header from './components/Header'
import Movies from './views/Movies'
import Starred from './views/Starred'
import WatchLater from './views/WatchLater'
import YouTubePlayer from './components/YoutubePlayer'
import { HOME, NOT_FOUND, STARRED, WATCH_LATER } from './constants/routes'
import NotFound from './views/NotFound'
import { TRAILER } from './constants/general'
import NoAvailable from './components/NoAvailable'
import 'reactjs-popup/dist/index.css'
import './styles/app.scss'
import { getMovieById } from './api/movie'

const App = () => {
  const state = useSelector((state) => state)
  const { movies } = state
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const [videoKey, setVideoKey] = useState()
  const [isOpen, setOpen] = useState(false)
  const navigate = useNavigate()

  const closeModal = () => setOpen(false)

  const closeCard = () => {}

  const getSearchResults = (query) => {
    if (query !== '') {
      setSearchParams(createSearchParams({ search: query }))
    } else {
      setSearchParams()
    }
  }

  const searchMovies = (query) => {
    navigate(HOME)
    dispatch(fetchMovies(query))
    getSearchResults(query)
  }

  const getMovies = () => {
    const searchQuery = searchParams.get('search')
    dispatch(fetchMovies(searchQuery))
  }

  const viewTrailer = (movie) => {
    getMovie(movie.id)
    if (!videoKey) setOpen(true)
    setOpen(true)
  }

  const getMovie = async (id) => {
    setVideoKey(null)
    const videoData = await getMovieById(id)
    const videos = videoData?.videos?.results
    if (videos.length) {
      const trailer = videos.find((vid) => vid.type === TRAILER)
      setVideoKey(trailer ? trailer.key : videos[0].key)
    }
  }

  useEffect(() => {
    getMovies()
  }, [searchParams])

  return (
    <div className='app'>
      <Header searchMovies={searchMovies} searchParams={searchParams} setSearchParams={setSearchParams} />

      <div className='container'>
        {videoKey ? <YouTubePlayer videoKey={videoKey} /> : <NoAvailable />}
        <Routes>
          <Route path={HOME} element={<Movies movies={movies} viewTrailer={viewTrailer} closeCard={closeCard} />} />
          <Route path={STARRED} element={<Starred viewTrailer={viewTrailer} />} />
          <Route path={WATCH_LATER} element={<WatchLater viewTrailer={viewTrailer} />} />
          <Route path={NOT_FOUND} element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
