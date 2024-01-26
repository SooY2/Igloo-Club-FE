import { useState } from 'react';
import { css } from '@emotion/react';
// import arrow from '../common/assets/imgs/arrow.png';

const MainPage = () => {
  const [selected, setSelected] = useState('광화문');

  const selectList = ['광화문', '판교'];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelect = (e: any) => {
    setSelected(e.target.value);
  };

  return (
    <div css={container}>
      <div css={top}>
        <div css={title}>
          <div css={titletop}>
            <select css={selectbox} onChange={handleSelect} value={selected}>
              {selectList.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            <span>에 위치한</span>
          </div>
          <div css={titlebottom}>
            <span>오늘의 인연을 소개해 드릴게요</span>
          </div>
        </div>
        <div css={subtitle}>
          <span>마음이 가는 당신만의 인연에게 눈길을 보내세요.</span>
        </div>
      </div>
      <div css={middle}></div>
      <div css={bottom}></div>
    </div>
  );
};

const container = css`
  display: flex;
  width: 100%;
  height: 100%;
  padding-top: 3.6rem;
  padding-left: 2.6rem;
  background-color: #897272;
`;

const top = css`
  display: flex;
  flex-direction: column;
`;

const title = css`
  display: flex;
  flex-direction: column;
`;

const titletop = css`
  display: flex;
`;

const titlebottom = css`
  display: flex;
`;

const selectbox = css`
  width: 8.3rem;
  background: url('arrow') no-repeat 95% 50%;
  border: none;
  border-radius: 10px;
`;

const subtitle = css`
  display: flex;
`;

const middle = css`
  display: flex;
`;

const bottom = css`
  display: flex;
`;

export default MainPage;
