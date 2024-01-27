import api from './config'

export async function getMovies(endpoint, params) {
  try {
    const response = await api.get(endpoint, { params })
    return response.data
  } catch (error) {
    throw error
  }
}

export async function getMovieById(id) {
  const endpoint = `/movie/${id}`
  try {
    const response = await api.get(endpoint, {
      params: {
        append_to_response: 'videos'
      }
    })
    return response.data
  } catch (error) {
    throw error
  }
}
