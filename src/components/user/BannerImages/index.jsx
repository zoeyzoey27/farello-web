import React from 'react'
import { Carousel } from 'antd'
import { useQuery } from '@apollo/client'
import { GET_BANNER_IMAGES } from './graphql'

const BannerImages = () => {
  const {data} = useQuery(GET_BANNER_IMAGES)
  return (
    <Carousel autoplay className="-mx-[50px]">
        {
            data?.bannerImages.map(bannerImage => (
                <img
                   key={bannerImage.id}
                   src={bannerImage.urlImage}
                   className="w-full h-fit"
                   alt="BannerImage"
                />
                
            ))
        }
    </Carousel>
  )
}

export default BannerImages
