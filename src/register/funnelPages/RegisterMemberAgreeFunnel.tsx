import styled from '@emotion/styled';
import { ArrowRight, CheckFill, CheckNone } from '../assets/svgs/0_index';
import RegisterHeader from '../components/RegisterHeader';
import * as St from '../styles/registerStyles';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import RegisterBtn from '../components/RegisterBtn';
import { 약관동의리스트 } from '../../common/constants/memberAgreeConstants';
import instance from '../../common/apis/axiosInstanse';

/** 체크박스 컴포넌트입니다 */
const Check = ({
  isAgree,
  onChange,
}: {
  isAgree: boolean;
  onChange: () => void;
}) => {
  return isAgree ? (
    <CheckFill onClick={onChange} />
  ) : (
    <CheckNone onClick={onChange} />
  );
};

/** ✔️ 약관동의 뷰 컴포넌트 입니다 */
const 약관동의 = ({
  onNext,
  percent,
}: {
  onNext: () => void;
  percent: number;
}) => {
  const [allAgree, setAllAgree] = useState(false);
  const [agree, setAgree] = useState<boolean[]>([false, false, false]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (agree[0] && agree[1]) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [agree]);

  //해당 인덱스의 동의여부를 변경하는 함수입니다
  const setAgreeAtIndex = (index: number, value: boolean) => {
    if (value === false) {
      setAllAgree(false);
    }

    const updatedAgree = agree.map((item, idx) =>
      idx === index ? value : item,
    );
    setAgree(updatedAgree);

    if (updatedAgree.every((item) => item === true)) {
      setAllAgree(true);
    }
  };

  const handleSubmit = async () => {
    await instance.patch(`api/member/consent`, { agreeMarketing: agree[2] });
    onNext();
  };

  return (
    <>
      <RegisterHeader isFirst={true} percent={percent} />
      <article css={St.articleStyles}>
        <section>
          <St.TitleBox>
            <St.Title>계정 생성을 시작하기 위해서는</St.Title>
            <St.Title>약관에 동의가 필요해요</St.Title>
          </St.TitleBox>
          <div css={tosStyles}>
            <StListTitle>
              <Check
                isAgree={allAgree}
                onChange={() => {
                  setAllAgree(!allAgree);
                  setAgree([!allAgree, !allAgree, !allAgree]);
                }}
              />
              <StListTitleBold>모든 약관에 동의합니다.</StListTitleBold>
            </StListTitle>
            <StListBox>
              {약관동의리스트.map((item, idx) => {
                return (
                  <li key={item.title} css={listStyles}>
                    <StListTitle>
                      <Check
                        isAgree={agree[idx]}
                        onChange={() => setAgreeAtIndex(idx, !agree[idx])}
                      />
                      <p>{`${item.title} (${item.option})`}</p>
                    </StListTitle>
                    <ArrowRight
                      onClick={() => window.open(item.url, '_blank')}
                    />
                  </li>
                );
              })}
            </StListBox>
          </div>
        </section>
        <RegisterBtn
          isActive={isActive}
          content="다음으로"
          onClick={handleSubmit}
        />
      </article>
    </>
  );
};

export default 약관동의;

const tosStyles = css`
  display: flex;
  flex-direction: column;
  padding: 7.8rem 0 0;
`;

const StListBox = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-top: 0.4rem;
  margin-top: 1.8rem;
  border-top: 0.5px solid ${({ theme }) => theme.colors.gray2};
`;

const listStyles = css`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 0;
`;

const StListTitleBold = styled.p`
  ${({ theme }) => theme.fonts.body2b};
`;

const StListTitle = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 0 0.5rem;
  ${({ theme }) => theme.fonts.body2r};

  color: ${({ theme }) => theme.colors.gray9};
`;
