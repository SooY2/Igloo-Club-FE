import styled from '@emotion/styled';
import Slider from 'react-slick';
import '../styles/slick.css';
import '../styles/slick-theme.css';
import {
  Carousel1,
  Carousel2,
  Carousel3,
  Carousel4,
} from '../assets/images/0_index';

const Info = () => {
  const CarouselImages = [Carousel1, Carousel2, Carousel3, Carousel4];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
  };

  return (
    <StCarouselContainer>
      <StSlider {...settings}>
        {CarouselImages.map((img, index) => (
          <StImage key={index} src={img} alt={`Carousel${index}`} />
        ))}
      </StSlider>
    </StCarouselContainer>
  );
};

export default Info;

const StCarouselContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: center;

  .slick-slider {
    width: 100%;
  }
`;

const StSlider = styled(Slider)`
  .slick-dots {
    position: absolute;
    top: 1px;
    display: block;
    padding: 0;
    text-align: center;
    list-style: none;
  }

  .slick-dots li {
    position: relative;
    display: inline-block;
    padding: 0;
    margin: 0% 0% 30% 2%;
    cursor: pointer;
  }

  .slick-dots li button {
    display: block;
    line-height: 0;
    color: transparent;
    cursor: pointer;
    background: transparent;
    border: 0;
    outline: none;
  }

  .slick-dots li button::before {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 8vw;
    color: rgb(184 184 184);
    text-align: center;
    content: '•';
    opacity: 0.25;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .slick-dots li button:hover,
  .slick-dots li button:focus {
    outline: none;
  }

  .slick-dots li button:hover::before,
  .slick-dots li button:focus::before {
    opacity: 1;
  }

  .slick-dots li.slick-active button::before {
    font-size: 10vw;
    color: black;
    opacity: 0.75;
  }
`;

const StImage = styled.img`
  margin-top: 2rem;
`;
