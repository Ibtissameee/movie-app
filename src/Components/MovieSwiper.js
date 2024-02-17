import './movieswiper.css';
import {Swiper, SwiperSlide} from 'swiper/react';
// Import Swiper styles

import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
//Import required modules
import {Autoplay, EffectCoverflow} from 'swiper/modules';
export default function MovieSwiper({slides, slideChange}){
    return(
       <Swiper
       effect={'coverflow'}
       grabCursor={true}
       centeredSlides={true}
       slidesPerView={'auto'}
       autoplay={{
         delay: 2500,
         disableOnInteraction: false,
       }}
       coverflowEffect={{
         rotate: 50,
         stretch: 0,
         depth: 100,
         modifier: 1,
         slideShadows: true,
       }}
       loop={true}
       modules={[EffectCoverflow, Autoplay]}
         className="movieSwiper"
       >
        {slides.map((slide) => ( // Added the correct map syntax
        <SwiperSlide > {/* Added key prop for optimization */}
          <img src={slide.previewImg} alt="Preview Image" onClick={()=>slideChange(slide.id)}/>
        </SwiperSlide>
      ))}
       </Swiper>
       
    );
}