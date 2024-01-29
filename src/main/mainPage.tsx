import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { theme } from '../common/styles/theme';
import { Arrow } from '../common/assets/svgs/index';

const MainPage = () => {
  const [selected, setSelected] = useState<string>('광화문');
  const [count, setCount] = useState<number>(5);

  const selectList = ['광화문', '판교'];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelect = (value: string) => {
    setSelected(value);
  };

  const SelectBtn = () => {
    handleSelect(selected === '광화문' ? '판교' : '광화문');
  };

  useEffect(() => {
    const id = setInterval(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setCount((count) => (count = 1));
    }, 60000);
    if (count === 0) {
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, [count]);

  return (
    <div css={Container}>
      <div css={Top.Wrapper}>
        <div css={Top.Title}>
          <div css={Top.Titletop}>
            <select
              css={Top.Selectbox}
              onChange={handleSelect}
              value={selected}
            >
              {selectList.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            <button type="button" onClick={SelectBtn}>
              <Arrow />
            </button>
            <span>에 위치한</span>
          </div>
          <div css={Top.Titlebottom}>
            <span>오늘의 인연을 소개해 드릴게요</span>
          </div>
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
    </div>
  );
};

export default MainPage;

const Container = css`
  display: flex;
  flex-direction: column;
  padding-top: 3.6rem;
  width: 100%;
  height: 100%;
  background-color: #e0cfcf;
`;

const Top = {
  Wrapper: css`
    height: 9.2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding-left: 2.6rem;
  `,

  Title: css`
    display: flex;
    flex-direction: column;
    ${theme.fonts.title};
    gap: 0.3rem;
  `,

  Titletop: css`
    display: flex;
    flex-direction: row;
  `,

  Titlebottom: css`
    display: flex;
  `,

  Selectbox: css`
    width: 5.8rem;
    appearance: none;
    border: none;
    color: ${theme.colors.primary};
    border-bottom: 0.2rem solid;
    ${theme.fonts.title};
    background-color: transparent;
  `,

  Subtitle: css`
    display: flex;
    color: ${theme.colors.gray6};
    ${theme.fonts.body2m};
  `,
};

const Middle = {
  Wrapper: css`
    width: 38rem;
    height: 9.2rem;
    display: flex;
    flex-direction: column;
    padding-top: 1.9rem;
    padding-left: 2.1rem;
    border-radius: 10px;
    margin-bottom: 3.9rem;
    margin-left: 2rem;
    background-color: ${theme.colors.gray0};
  `,

  Title: css`
    display: flex;
    color: ${theme.colors.gray7};
    text-align: center;
    font-size: 11px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    padding-bottom: 0.5rem;
  `,

  Subtitle: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    color: ${theme.colors.gray8};
    ${theme.fonts.body2m};
    gap: 0.3rem;
  `,

  Timer: css`
    display: flex;
    color: ${theme.colors.gray8};
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `,
};

const Bottom = {
  Wrapper: css`
    display: flex;
    padding-left: 2.6rem;
  `,

  Title: css`
    display: flex;
    color: ${theme.colors.gray8};
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `,
};
