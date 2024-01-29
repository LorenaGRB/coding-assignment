import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from './utils.js'
import App from '../App.js'

it('movies starred and saved to watch later', async () => {
  renderWithProviders(<App />)

  await userEvent.type(screen.getByTestId('search-movies'), 'forrest gump')
  await waitFor(() => {
    expect(screen.getAllByText('Through the Eyes of Forrest Gump')[0]).toBeInTheDocument()
  })
  const starMovieLink = screen.getAllByTestId('star-link')[0]

  await userEvent.click(starMovieLink)
  await waitFor(() => {
    const starIconAfterFirstClick = starMovieLink.querySelector('i')
    expect(starIconAfterFirstClick).toHaveClass('bi-star-fill')
  })

  await userEvent.click(starMovieLink)
  await waitFor(() => {
    const starIconAfterSecondClick = starMovieLink.querySelector('i')
    expect(starIconAfterSecondClick).toHaveClass('bi-star')
  })

  const watchLaterLink = screen.getAllByTestId('watch-later')[0]
  await waitFor(() => {
    expect(watchLaterLink).toBeInTheDocument()
  })
  await userEvent.click(watchLaterLink)
  await waitFor(() => {
    expect(screen.getByTestId('remove-watch-later')).toBeInTheDocument()
  })

  await userEvent.click(screen.getAllByTestId('remove-watch-later')[0])
})
