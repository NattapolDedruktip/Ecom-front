// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import axios from "axios";
import { useEffect, useState } from "react";

const ContentCarousel = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    hdlGetImage();
  }, []);

  const hdlGetImage = () => {
    axios
      .get("https://picsum.photos/v2/list?page=1&limit=15")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Swiper
        pagination={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper  h-80 object-cover rounded-md mb-4"
      >
        {data?.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item.download_url} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        navigation={true}
        className="mySwiper  object-cover rounded-md"
      >
        {data?.map((item, index) => (
          <SwiperSlide key={index}>
            <img className="rounded-md" src={item.download_url} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default ContentCarousel;
