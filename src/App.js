import { Routes, Route } from 'react-router-dom'
import Movies from './views/Movies'
import Starred from './views/Starred'
import WatchLater from './views/WatchLater'
import { HOME, NOT_FOUND, STARRED, WATCH_LATER } from './constants/routes'
import NotFound from './views/NotFound'
import { ModalProvider } from './contexts/ModalContext'
import Layout from './components/Layout'
import 'reactjs-popup/dist/index.css'
import './styles/globals.scss'

const App = () => {
  return (
    <ModalProvider>
      <Layout>
        <Routes>
          <Route path={HOME} element={<Movies />} />
          <Route path={STARRED} element={<Starred />} />
          <Route path={WATCH_LATER} element={<WatchLater />} />
          <Route path={NOT_FOUND} element={<NotFound />} />
        </Routes>
      </Layout>
    </ModalProvider>
  )
}

export default App
