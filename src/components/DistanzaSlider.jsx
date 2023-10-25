import React, { useState } from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { DistanzaDalMare, InternalConv, LocationTwo } from './Icon';

const DistanzaSlider = ({ distanzaData }) => {
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
            {distanzaData?.map(({ icon, title, text }, i) => (
                title && <SwiperSlide key={i}>
                    <div className="destanza-slide-item">
                        <div className="icon">{icon}</div>
                        <h5>{title}</h5>
                        <div>{text}</div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default DistanzaSlider;
