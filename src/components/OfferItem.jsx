import React, { useCallback, useEffect, useRef, useState } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import mask from "../assets/img/mask.png";
import bg_3 from "../assets/img/offer-bg-2.png";
import bg_4 from "../assets/img/offer-bg-3.png";
import bg_2 from "../assets/img/offer-bg.png";
import bg_1 from "../assets/img/regular-bg.png";

import axios from "axios";
import loading from "../assets/img/dualLoading.gif";
import { BASE_API_URL } from "../keys";
import DistanzaSlider from "./DistanzaSlider";
import {
  AngleDown,
  AngleUp,
  LocationThree,
  NextArrow,
  Phone,
  PrevArrow,
  Star,
  Whatsapp,
} from "./Icon";
import OfferPriceSlider from "./OfferPriceSlider";
const OfferItem = (props, ref) => {
  const {
    offer,
    index,
    hotel,
    checkInDate,
    checkOutDate,
    setUserData,
    userData,
    sending,
    setvalue,
    value,
    handleSubmit,
    buttonDisabled,
    handleUpdateRooms,
    setDatePickerOpen,
  } = props;

  const [loadingOffers, setLoadingOffers] = useState(false);

  const [offersLoaded, setOffersLoaded] = useState(false);
  const [offers, setOffers] = useState(null);

  const [offerOpen, setOfferOpen] = useState(false);
  const [offerButtonIn, setOfferButtonIn] = useState(true);

  const sliderRef = useRef(null);
  const images = hotel.immaginiUrl
    ? hotel.immaginiUrl.split("\\\\n")
    : hotel.img;

  const loadOffers = () => {
    setLoadingOffers(true);
    axios
      .post(`${BASE_API_URL}/api/data/bestoffers`, {
        checkInDate,
        checkOutDate,
        offertaIds: hotel.Offerte,
      })
      .then((res) => {
        const sortedOffers = res.data.offers;
        setOffers(sortedOffers);
      })
      .catch(() => {
        setLoadingOffers(false);
      });
  };
  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  useEffect(() => {
    if (!offersLoaded) {
      loadOffers();
    }
  }, []);

  useEffect(() => {
    if (offers) {
      setLoadingOffers(false);
      setOffersLoaded(true);
    }
  }, [offers]);

  const [lowestOffered, setLowOffer] = useState({});

  useEffect(() => {
    const offers = hotel?.offers || [];
    let lowestOffer = null;

    for (const offer of offers) {
      if (
        !lowestOffer ||
        offer.lowestOfferPrice < lowestOffer.lowestOfferPrice
      ) {
        lowestOffer = offer;
      }
    }

    setLowOffer(lowestOffer);
  }, [hotel]);

  console.log(lowestOffered.lowestOfferPrice);

  return (
    <div className="offer-item">
      <div
        className="offer-item-top"
        style={{
          background: `url(${
            offer
              ? index % 3 === 0
                ? bg_4
                : index % 3 === 1
                ? bg_2
                : bg_3
              : bg_1
          }) no-repeat center center / cover`,
        }}
      >
        <div
          className={`offer-item-top-top d-flex justify-content-between align-items-center ${
            hotel.ticker ? "has-ticker" : ""
          }
					`}
        >
          <div className="rating">
            {hotel?.rating && (
              <>
                {Array.from({ length: hotel?.rating }, (_, index) => (
                  <Star key={index} />
                ))}
              </>
            )}
          </div>

          <div className="price-area d-flex flex-col">
            <div>A PARTIRE DA (giorno)</div>
            <h4
              className="font-bold align-self-end"
              style={{ color: "var(--title)" }}
            >
              {lowestOffered?.lowestOfferPrice || 0}
              {lowestOffered?.breakdown[0]?.currency}
            </h4>
          </div>

          {hotel.ticker ? (
            <span className="ticker d-none d-md-flex ">
              <span>{hotel.ticker}</span>
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="offer-top-middle d-flex flex-wrap justify-content-between">
          <div className="offer-left-side">
            <div
              className="slider-area"
              style={{
                WebkitMask: `url(${mask}) no-repeat center center / contain`,
              }}
            >
              <div className="prev-arrow" onClick={handlePrev}>
                <PrevArrow />
              </div>
              <div className="next-arrow" onClick={handleNext}>
                <NextArrow />
              </div>
              <Swiper
                spaceBetween={20}
                modules={[Pagination, Navigation]}
                // pagination={{ clickable: true }}
                ref={sliderRef}
              >
                {hotel?.images
                  .slice(0, hotel?.images.length - 1)
                  .map((item, i) => (
                    <SwiperSlide key={i}>
                      <div className="img-item">
                        <img src={item.src} alt="" />
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
              {/* {ticker ? (
                                <span className="ticker d-md-none">
                                    <span>{ticker}</span>
                                </span>
                            ) : (
                                ''
                            )} */}
            </div>
            <div className="slider-content-area">
              <h5 className="title">
                <a href="#0" className="text-title">
                  {hotel?.name}
                </a>
              </h5>
              <span className="location">
                <LocationThree /> {hotel?.state}
              </span>

              <h6 className="subtitle">
                {hotel?.summaryDescription?.length > 80
                  ? hotel?.summaryDescription?.substring(0, 120) + "..."
                  : hotel?.summaryDescription}
              </h6>
              <div className="lorem">
                {hotel?.hotelDescription?.length > 80
                  ? hotel?.hotelDescription?.substring(0, 120) + "..."
                  : hotel?.hotelDescription}
              </div>
            </div>
          </div>
          <div className="offer-right-side">
            <DistanzaSlider distanzaData={hotel?.distance} />
            <div className="offer-btn-grp">
              <button
                className={`cmn-btn ${offerOpen ? "disable" : ""}`}
                data-bs-toggle="collapse"
                // data-bs-target={`#offer-${index}`}
                onClick={() => setOfferOpen(!offerOpen)}
              >
                {offerOpen ? (
                  <span className="text-title">
                    Chiudi Offerta <AngleUp />
                  </span>
                ) : (
                  <span>
                    Vedi Offerta <AngleDown />
                  </span>
                )}
              </button>
              <button
                type="button"
                className="outline-0 bg-transparent whatsapp-btn"
              >
                <a
                  href={`https://api.whatsapp.com/send/?phone=3908119758555&text=Richiesta Informazioni da InfoIschia per L'hotel ${hotel["Nome Hotel"]}&type=phone_number&app_absent=0`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Whatsapp />
                </a>
              </button>
              <a href="Tel:+08118555211" className="tel-btn">
                <div className="icon">
                  <Phone color="#24A9E0" />
                </div>
                <div className="cont">
                  <div>Parliamone!</div>
                  <div className="subtxt">08118555211</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {!offerOpen ? null : (
        <div className="offer-item-middle " id={`offer-${index}`}>
          <div className="overlayer" />
          {loadingOffers ? (
            <OffersLoading />
          ) : hotel?.offers && hotel?.offers.length ? (
            <OfferPriceSlider
              setUserData={setUserData}
              userData={userData}
              sending={sending}
              setvalue={setvalue}
              value={value}
              handleSubmit={handleSubmit}
              offers={hotel?.offers}
              hotel={hotel}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              setOfferButtonIn={setOfferButtonIn}
              offerButtonIn={offerButtonIn}
              serial={index}
              setDatePickerOpen={setDatePickerOpen}
              buttonDisabled={buttonDisabled}
              handleUpdateRooms={handleUpdateRooms}
              handleOfferClose={() => {
                setOfferOpen(!offerOpen);
              }}
            />
          ) : (
            <>
              <h1>No offers to show</h1>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default React.forwardRef(OfferItem);

const OffersLoading = () => {
  return <img src={loading} alt="loading" className="w-[2rem] h-[2rem]" />;
};
