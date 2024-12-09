import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import axios from "axios";
import { useEffect, useState } from "react";

const SwiperShowProduct = ({ children }) => {
  return (
    <div>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation, Autoplay]}
        navigation={true}
        className="mySwiper  object-cover rounded-md"
      >
        {children}
      </Swiper>
    </div>
  );
};
export default SwiperShowProduct;
