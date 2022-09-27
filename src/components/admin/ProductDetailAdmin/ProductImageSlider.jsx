import React, { useState } from 'react'
import { Row } from 'antd'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper'
import './style.css'

const ProductImageSlider = ({images}) => {
  const [activeThumb, setActiveThumb] = useState(null)
  return (
    <>
        <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation, Thumbs]}
            grabCursor={true}
            thumbs={{swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null}}
            className="product-images-slider">
            {
                images.map((item, index) => (
                    <SwiperSlide key={index} >
                        <img src={item} alt="" className="w-full h-full object-cover object-center" />
                    </SwiperSlide>
                ))
            }
        </Swiper>
        <Swiper
            onSwiper={setActiveThumb}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            modules={[Navigation, Thumbs]}
            className="product-images-slider-thumbs">
            {
                images.map((item, index) => (
                    <SwiperSlide key={index} className="mt-3">
                        <Row className="border-2 border-[#dddbdb] cursor-pointer image-wrap">
                            <img src={item} alt="" className="w-full h-full object-cover object-center"  />
                        </Row>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    </>
  )
}

export default ProductImageSlider