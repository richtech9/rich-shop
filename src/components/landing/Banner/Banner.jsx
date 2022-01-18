import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";

export const Banner = () => {
  const [sliders, setSliders] = useState([]);
  const getSlider = async () => {
    const res = await axios.get("setting/home/sliders");
    if (res.data.success) {
      setSliders(res.data.data.one);
    }
  };

  const settings = {
    dots: false,

    infinite: true,
    arrows: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    lazyLoad: "progressive",
  };

  useEffect(() => {
    getSlider();
  }, []);
  return (
    <>
      {sliders.length ? (
        <Slider {...settings}>
          {sliders.map((v) => (
            <div
              className="main-block load-bg"
              key={v.img}
              //style={{ backgroundImage: `url(${v.img})` }}
            >
              <img
                src={v.img}
                alt="slider image"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="main-block load-bg"></div>
      )}
    </>
  );
};
