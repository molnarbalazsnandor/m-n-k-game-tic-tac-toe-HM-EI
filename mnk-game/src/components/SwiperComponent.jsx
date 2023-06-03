import React, { useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function SwiperComponent({ playerToken, setplayerToken, playerIndex }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "image1.png",
    "image2.png",
    "image3.png",
    "image4.png",
    "image5.png",
    "image6.png",
    "image7.png",
    "image8.png",
    "image9.png",
    "image10.png",
  ];

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        initialSlide={playerIndex}
        onSlideChange={(swiper) => setplayerToken(images[swiper.activeIndex])}
        style={{ width: "200px" }}
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={require(`../images/tokens/${image}`)}
              alt={`Image ${index + 1}`}
              style={{ width: "50px" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default SwiperComponent;
