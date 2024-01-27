import { useEffect, useState } from 'react'
import { Routes, Route, createSearchParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchMovies } from './data/moviesSlice'
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER, ENDPOINT, API_KEY } from './constants/endpoints'
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

const App = () => {
  const state = useSelector((state) => state)
  const { movies } = state
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')
  const [videoKey, setVideoKey] = useState()
  const [isOpen, setOpen] = useState(false)
  const navigate = useNavigate()

  const closeModal = () => setOpen(false)

  const closeCard = () => {}

  const getSearchResults = (query) => {
    if (query !== '') {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=${query}`))
      setSearchParams(createSearchParams({ search: query }))
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER))
      setSearchParams()
    }
  }

  const searchMovies = (query) => {
    navigate(HOME)
    getSearchResults(query)
  }

  const getMovies = () => {
    if (searchQuery) {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=${searchQuery}`))
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER))
    }
  }

  const viewTrailer = (movie) => {
    getMovie(movie.id)
    if (!videoKey) setOpen(true)
    setOpen(true)
  }

  const getMovie = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`

    setVideoKey(null)
    const videoData = await fetch(URL).then((response) => response.json())

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find((vid) => vid.type === TRAILER)
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key)
    }
  }

  useEffect(() => {
    getMovies()
  }, [])

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
