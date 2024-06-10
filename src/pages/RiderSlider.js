import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export const RiderSlider = () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={10}
      slidesPerView={1}
      navigation
    //   pagination={{ clickable: true }}
    //   scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide>
      <div className="width:20rem,padding:2rem"><img style={{width:"auto",height:"200px",position:"relative",top:"70px"}} src="../img/login1.png" alt=""/>
      <p style={{position:'relative',top:'69px',fontWeight:"100",fontSize:"1.5rem"}}>Step One</p>
      <p style={{position:"relative",top:"53px",fontWeight:100,fontSize:"1.2rem"}}>You can login  here.</p>
      </div>
      </SwiperSlide>
      <SwiperSlide>
      <img style={{width:"auto",height:"200px",position:"relative",top:"70px"}} src="../img/login2.png" alt=""/>
      <p style={{position:'relative',top:'69px',fontWeight:"100",fontSize:"1.5rem"}}>Step Two</p>
      <p style={{position:"relative",top:"53px",fontWeight:100,fontSize:"1.2rem"}}>After login you can access pages.</p>
              
      </SwiperSlide>
      ...
    </Swiper>
  );
};