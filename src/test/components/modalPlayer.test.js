import { render, screen } from '@testing-library/react'
import ModalPlayer from '../../components/ModalPlayer'
import { useModal } from '../../contexts/ModalContext'
import { getMovieById } from '../../api/movie'
import { act } from 'react-dom/test-utils'

jest.mock('../../api/movie')
jest.mock('../../contexts/ModalContext')

describe('ModalPlayer', () => {
  it('renders YoutubePlayer when videoKey exists', async () => {
    useModal.mockReturnValue({
      isModalOpen: true,
      modalInfo: { id: 'movieId' },
      closeModal: jest.fn()
    })

    getMovieById.mockResolvedValue({
      videos: {
        results: [{ type: 'TRAILER', key: 'VideoKey' }]
      }
    })

    await act(async () => {
      render(<ModalPlayer />)
    })

    expect(screen.getByTestId('youtube-player')).toBeInTheDocument()
  })

  it('renders NoAvailable when videoKey does not exist', async () => {
    useModal.mockReturnValue({
      isModalOpen: true,
      modalInfo: { id: 'someId' },
      closeModal: jest.fn()
    })

    getMovieById.mockResolvedValue({
      videos: {
        results: []
      }
    })

    await act(async () => {
      render(<ModalPlayer />)
    })

    expect(screen.getByTestId('no-available')).toBeInTheDocument()
  })
})
