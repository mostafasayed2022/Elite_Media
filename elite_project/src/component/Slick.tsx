
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Css/Home.css';
import logo1 from '../assets/logos/logo2.png';
import logo2 from '../assets/logos/logo3.png';
import logo3 from '../assets/logos/logo4.png';
import logo4 from '../assets/logos/logo5.png';
import logo5 from '../assets/logos/logo6.png';
import logo6 from '../assets/logos/logo7.png';
import logo7 from '../assets/logos/logo8.png';

const Slick = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };

  return (
    <div className="logo-carousel-container">
      <Slider {...settings}>
        <div className="logo-item">
          <img src={logo1} alt="Logo 1" />
        </div>
        <div className="logo-item">
          <img src={logo2} alt="Logo 2" />
        </div>
        <div className="logo-item">
          <img src={logo3} alt="Logo 3" />
        </div>
        <div className="logo-item">
          <img src={logo4} alt="Logo 4" />
        </div>
        <div className="logo-item">
          <img src={logo5} alt="Logo 5" />
        </div>
        <div className="logo-item">
          <img src={logo6} alt="Logo 6" />
        </div>
        <div className="logo-item">
          <img src={logo7} alt="Logo 7" />
        </div>
      </Slider>
    </div>
  );
};

export default Slick;
