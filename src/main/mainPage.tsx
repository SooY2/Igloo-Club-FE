/** 메인 페이지 **/

import { css } from '@emotion/react';
import { theme } from '../common/styles/theme';
import instance from '../common/apis/axiosInstanse';
import NavBar from '../common/components/NavBar';
import PickProfileBtn from './components/PickProfileBtn';
import CustomSelect from './components/CustomSelect';

const MainPage = () => {
  // const [count, setCount] = useState(5);

  const handleGetAllProfile = async () => {
    try {
      const res = await instance.get('/api/nungil/nungils?status=RECOMMENDED', {
        params: {
          page: 0,
          size: 3,
        },
      });

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  handleGetAllProfile(); // 이 부분을 useEffect 내로 이동

  return (
    <div css={Container}>
      <div css={Top.Wrapper}>
        <div css={Top.TitleTop}>
          <CustomSelect />
          <span>에 위치한</span>
        </div>
        <div css={Top.TitleBottom}>
          <span>오늘의 인연을 소개해 드릴게요</span>
        </div>
        <div css={Top.Subtitle}>
          <span>마음이 가는 당신만의 인연에게 눈길을 보내세요.</span>
        </div>
      </div>
      <div css={Middle.Wrapper}>
        <div css={Middle.Title}>
          <span>오늘의 눈길 매칭 가능 시간까지</span>
        </div>
        <div css={Middle.Subtitle}>
          <span css={Middle.Timer}>시간 분</span>
          <span>남았어요 🕓</span>
        </div>
      </div>
      <div css={Bottom.Wrapper}>
        <div css={Bottom.Title}>
          <span>내가 받은 인연 프로필</span>
        </div>
      </div>
      <div css={PickBtn}>
        <PickProfileBtn />
      </div>
      <div css={Navigation}>
        <NavBar />
      </div>
    </div>
  );
};

export default MainPage;

const Container = css`
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-top: 3.6rem;
  background-color: #e0cfcf;
`;

const Top = {
  Wrapper: css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 9.2rem;
    padding-left: 2.6rem;
    margin-bottom: 1.5rem;
  `,

  TitleTop: css`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    ${theme.fonts.title};
  `,

  TitleBottom: css`
    ${theme.fonts.title};
  `,

  Selectbox: css`
    width: 5.8rem;
    color: ${theme.colors.primary};
    appearance: none;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid;
    ${theme.fonts.title};
  `,

  Subtitle: css`
    display: flex;
    color: ${theme.colors.gray6};
    ${theme.fonts.body2m};
  `,
};

const Middle = {
  Wrapper: css`
    display: flex;
    flex-direction: column;
    width: 34.2rem;
    height: 9.2rem;
    padding-top: 1.9rem;
    padding-left: 2.1rem;
    margin-bottom: 3.9rem;
    margin-left: 2rem;
    background-color: ${theme.colors.gray0};
    border-radius: 10px;
  `,

  Title: css`
    display: flex;
    padding-bottom: 0.5rem;
    font-size: 11px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: ${theme.colors.gray7};
    text-align: center;
  `,

  Subtitle: css`
    display: flex;
    flex-direction: row;
    gap: 0.3rem;
    align-items: center;
    color: ${theme.colors.gray8};
    ${theme.fonts.body2m};
  `,

  Timer: css`
    display: flex;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    color: ${theme.colors.gray8};
  `,
};

const Bottom = {
  Wrapper: css`
    display: flex;
    padding-left: 2.6rem;
  `,

  Title: css`
    display: flex;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    color: ${theme.colors.gray8};
  `,
};

const PickBtn = css`
  position: fixed;
  bottom: 0;
  left: 50%;
  z-index: 999;
  margin-bottom: 8.2rem;
  transform: translateX(-50%);
`;

const Navigation = css`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: ${theme.colors.white};
`;
