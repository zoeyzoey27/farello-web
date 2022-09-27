import React from 'react'
import { Carousel } from 'antd';
import { useQuery } from '@apollo/client';
import { getBannerImages } from '../../../graphqlClient/queries';

const BannerImages = () => {
  const {loading, error, data} = useQuery(getBannerImages)
  if (loading) return <p>Loading ...</p>
  if (error) return <p>Error!</p>
  return (
    <Carousel autoplay className="-mx-[50px]">
        {
            data.bannerImages.map(bannerImage => (
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
