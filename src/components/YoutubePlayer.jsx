import ReactPlayer from 'react-player'
import { YOUTUBE_URL } from '../constants/links'

const YoutubePlayer = ({ videoKey }) => (
  <ReactPlayer
    className='video-player'
    url={`${YOUTUBE_URL}?v=${videoKey}`}
    controls={true}
    playing={true}
    data-testid='youtube-player'
  />
)

export default YoutubePlayer
