import React from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { DistanzaDalMare, InternalConv, LocationTwo } from "./Icon";

const DistanzaSlider = ({ distanzaData }) => {
  const icons = [
    {
      icon: <LocationTwo />,
    },
    {
      icon: <DistanzaDalMare />,
    },
    {
      icon: <InternalConv />,
    },
  ];

  return (
    <Swiper
      slidesPerView={1.4}
      spaceBetween={12}
      modules={[Pagination, Navigation]}
      pagination={{ clickable: true }}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 12,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 12,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 12,
        },
      }}
    >
      {distanzaData?.slice(0, 3).map((item, i) => (
        <SwiperSlide key={i}>
          <div className="destanza-slide-item">
            <div className="icon">
              {(i <= 3 && icons[i].icon) || icons[i].icon}
            </div>
            <h5>{item?.distance + " " + item?.scale}</h5>
            <div>{item?.label}</div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default DistanzaSlider;
