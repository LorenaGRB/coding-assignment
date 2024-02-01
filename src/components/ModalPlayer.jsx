import NoAvailable from './UI/NoAvailable'
import Modal from './UI/Modal'
import { useEffect, useState } from 'react'
import { getMovieById } from '../api/movie'
import { TRAILER } from '../constants/general'
import { useModal } from '../contexts/ModalContext'
import YoutubePlayer from './UI/YoutubePlayer'

const ModalPlayer = () => {
  const { isModalOpen, modalInfo, closeModal } = useModal()
  const [videoKey, setVideoKey] = useState(null)

  const getMovie = async (id) => {
    const videoData = await getMovieById(id)
    const videos = videoData?.videos?.results
    if (videos.length) {
      const trailer = videos.find((vid) => vid.type === TRAILER)
      setVideoKey(trailer ? trailer.key : videos[0].key)
    }
  }

  useEffect(() => {
    if (isModalOpen && modalInfo?.id) {
      getMovie(modalInfo.id)
    } else {
      setVideoKey(null)
    }
  }, [isModalOpen, modalInfo])

  return (
    <Modal isOpen={isModalOpen} closeModal={closeModal}>
      {videoKey ? <YoutubePlayer videoKey={videoKey} isPlaying={isModalOpen} /> : <NoAvailable />}
    </Modal>
  )
}

export default ModalPlayer
