import React from 'react'
import videoBackground from '../../../assets/images/videoBackground.mp4'

const VideoBanner = () => {
  return (
    <video preload='false' autoPlay muted loop className='max-h-[680px] w-full object-cover'>
       <source src={videoBackground} type="video/mp4" />
    </video>
  )
}

export default VideoBanner