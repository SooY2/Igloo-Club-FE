/**로그인 페이지입니다 */

import { css } from '@emotion/react';
import { HeroImage } from '../common/assets/images/0_index';
import styled from '@emotion/styled';
import { 약관동의리스트 } from '../common/constants/memberAgreeConstants';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import './styles/slick.css';
import './styles/slick-theme.css';
import { logowhite } from '../common/assets/images/0_index';
import { line } from '../common/assets/images/0_index';
import {
  Carousel1,
  Carousel2,
  Carousel3,
  Carousel4,
} from './assets/images/0_index';

const Login = () => {
  const { state } = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (state) localStorage.setItem('path', state);
    else localStorage.setItem('path', '/main-page');
  }, []);

  const Rest_api_key = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const redirect_uri = import.meta.env.VITE_REDIRECT_URI;
  const guidement = '옆으로 넘겨 가이드 보기 >>>';

  const handleSlideChange = (current: number, next: number) => {
    setCurrentSlide(next);
  };

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current: number, next: number) =>
      handleSlideChange(current, next),
  };

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <StCarouselContainer>
      <StSlider {...settings} currentSlide={currentSlide}>
        <div css={loginContainer}>
          <img src={HeroImage} css={backgroundImage} />
          <div css={containerStyles}>
            <StLogo src={logowhite} />
            <StTopMent>한 번의 눈길,</StTopMent>
            <StTopMent>한 잔의 커피,</StTopMent>
            <StLine src={line} />
            <StBottomMent>
              •&nbsp;•&nbsp;
              <br />한 명의 인연
            </StBottomMent>
            <StLoginBox>
              <StPrement>현재는 사전신청을 받고 있어요</StPrement>
              <StButton onClick={handleLogin}>카카오톡으로 로그인하기</StButton>
              <StGuide>{guidement}</StGuide>
            </StLoginBox>
          </div>
          <Footer>
            <StFooterTitle>(주) 멋쟁이사자처럼</StFooterTitle>
            <div
              css={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <p>서울 종로구 종로3길17, 광화문D타워 D1동 16층, 17층</p>
              <div css={{ display: 'flex', gap: '1rem' }}>
                <p>대표 나성영</p>
                <p>|</p>
                <p>사업자등록번호: 264-88-01106</p>
              </div>
              <p>문의 nungil.official@gmail.com</p>
              <p>Copyright © 멋쟁이사자처럼 All rights reserved</p>
            </div>
            <div css={{ display: 'flex', gap: '1rem' }}>
              <p onClick={() => window.open(약관동의리스트[1].url, '_blank')}>
                {약관동의리스트[1].title}
              </p>
              <p>|</p>
              <p onClick={() => window.open(약관동의리스트[0].url, '_blank')}>
                {약관동의리스트[0].title}
              </p>
            </div>
          </Footer>
        </div>
        <div css={infoContainer}>
          <StCarouselMent>
            <StBlackMent>
              <StPinkMent>회사 이메일 인증</StPinkMent>이 완료된
              <br />
              직장인만 사용할 수 있어요
            </StBlackMent>
          </StCarouselMent>
          <img src={Carousel1} css={carouselImage} />
        </div>
        <div css={infoContainer}>
          <StCarouselMent>
            <StBlackMent>
              <StPinkMent>회사부터 매력포인트</StPinkMent>까지!
              <br />
              자세히 적힌 프로필을 볼 수 있어요
            </StBlackMent>
          </StCarouselMent>
          <img src={Carousel2} css={carouselImage} />
        </div>
        <div css={infoContainer}>
          <StCarouselMent>
            <StBlackMent>
              <StPinkMent>마음에 드는 이성이 있다면</StPinkMent>
              <br />
              지금 바로 눈길을 보내보세요 👀💕
            </StBlackMent>
          </StCarouselMent>
          <img src={Carousel3} css={carouselImage} />
        </div>
        <div css={infoContainer}>
          <StCarouselMent>
            <StBlackMent>
              <StPinkMent>설레는 첫 만남</StPinkMent>을 위해
              <br />
              최적의 시간과 장소도 추천드려요
            </StBlackMent>
          </StCarouselMent>
          <img src={Carousel4} css={carouselImage} />
        </div>
      </StSlider>
    </StCarouselContainer>
  );
};

export default Login;

const StCarouselContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  max-width: 42.5rem;
  height: calc(var(--vh, 1vh) * 100);

  .slick-slider {
    z-index: 2;
    width: 100%;
    height: calc(var(--vh, 1vh) * 100);
  }
`;

const StSlider = styled(Slider)<{ currentSlide: number }>`
  .slick-list {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow-x: hidden;
  }

  .slick-prev,
  .slick-next {
    position: absolute;
  }

  .slick-dots {
    position: absolute;
    top: 1px;
    display: block;
    display: ${(props) => (props.currentSlide === 0 ? 'block' : 'none')};
    width: 100%;
    padding: 0;
    margin-top: 7rem;
    text-align: center;
    list-style: none;
    visibility: ${(props) => (props.currentSlide === 0 ? 'hidden' : 'visible')};
    opacity: ${(props) => (props.currentSlide === 0 ? 0 : 1)};
  }

  .slick-dots li {
    position: relative;
    display: inline-block;
    padding: 0;
    margin: 0 0.5rem;
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
    font-size: 1rem;
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
    font-size: 2rem;
    color: black;
    opacity: 0.75;
  }
`;

const loginContainer = css`
  display: flex;
  flex-direction: row;
  align-items: start;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
`;

const StLogo = styled.img`
  width: 6rem;
  margin-bottom: 0.7rem;
`;

const StTopMent = styled.p`
  font-size: 2.5rem;
  font-weight: 500;
  color: #fff;
  letter-spacing: -0.3px;
`;

const StLine = styled.img`
  height: 10rem;
  margin-top: 1rem;
`;

const StBottomMent = styled.p`
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 3rem;
  color: #fff;
  text-align: end;
  letter-spacing: 0.3px;
`;

const infoContainer = css`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 3.5rem;
  margin-top: 12rem;
`;

const backgroundImage = css`
  position: absolute;
  z-index: 1;
  width: 100vw;
  max-width: 42.5rem;
  height: 100vh;
`;

const StCarouselMent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 0 3rem;
`;

const StBlackMent = styled.p`
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 3rem;
  color: ${({ theme }) => theme.colors.gray9};
  text-align: center;
  letter-spacing: -0.3px;
`;

const StPinkMent = styled.span`
  font-size: 2.2rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  letter-spacing: -0.3px;
`;

const carouselImage = css`
  z-index: 1;
  width: 100%;
  max-width: 42.5rem;
  height: auto;
`;

const containerStyles = css`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: start;
  justify-content: start;
  width: 100%;
  height: 100vh;
  padding: 6rem 3rem 4rem;
`;

const StLoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const StPrement = styled.p`
  padding: 1.1rem 2.2rem;
  margin-top: 4rem;
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray1};
  text-align: center;
  letter-spacing: -0.3px;
  border: 2px solid #fff;
  border-radius: 30px;
`;

const StGuide = styled.p`
  color: ${({ theme }) => theme.colors.gray4};
  color: ${({ theme }) => theme.fonts.body2b};
`;

const StButton = styled.button`
  position: relative;
  display: block;
  width: 100%;
  height: 5.2rem;
  padding-left: 2rem;
  margin-top: 1.6rem;
  margin-bottom: 1.9rem;
  color: #34221d;
  text-align: center;
  background-color: #fae100;
  background-image: url('https://www.innergarm.com/design/rtx22/re_2022/kakao_login_icon.svg');
  background-repeat: no-repeat;
  background-attachment: initial;
  background-position-x: 1.2rem;
  background-position-y: center;
  background-clip: initial;
  background-origin: initial;
  background-size: 26px;
  border-radius: 5px;

  ${({ theme }) => theme.fonts.body1b};
`;

const Footer = styled.footer`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-left: 3rem;
  margin-top: 5rem;
  margin-bottom: 3rem;
  color: #fff;

  ${({ theme }) => theme.fonts.body3m};
`;

const StFooterTitle = styled.p`
  ${({ theme }) => theme.fonts.body1};
`;
