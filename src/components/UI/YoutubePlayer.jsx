import ReactPlayer from 'react-player'
import { YOUTUBE_URL } from '../../constants/links'

import React, { useState } from 'react'
import { Loader } from './Loader'
import '../../styles/components/UI/youtubePlayer.scss'

const YoutubePlayer = ({ videoKey, isPlaying }) => {
  const [isVideoLoading, setIsVideoLoading] = useState(true)

  const handleVideoReady = () => {
    setIsVideoLoading(false)
  }

  return (
    <div className='video-container'>
      {isVideoLoading && <Loader />}
      <ReactPlayer
        className='video-player'
        url={`${YOUTUBE_URL}?v=${videoKey}`}
        controls={true}
        playing={isPlaying}
        onReady={handleVideoReady}
        data-testid='youtube-player'
      />
    </div>
  )
}

export default YoutubePlayer
