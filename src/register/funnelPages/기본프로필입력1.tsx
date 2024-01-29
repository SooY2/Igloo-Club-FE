import { useState } from 'react';
import RegisterBtn from '../components/RegisterBtn';
import RegisterHeader from '../components/RegisterHeader';
import * as St from '../styles/registerStyles';
import { StBasicInput } from '../styles/registerInputStyles';
import { RegisterBasicInput } from '../components/RegisterInputs';
import styled from '@emotion/styled';
import { NavTypesProps } from '../types/navTypes';

const 기본프로필입력1 = ({ onPrev, onNext }: NavTypesProps) => {
  const [isActive] = useState(false);

  const handleSubmit = () => {
    //서버통신
    onNext();
  };

  return (
    <>
      <RegisterHeader percent={55} onPrev={onPrev} />
      <article css={St.articleStyles}>
        <section css={St.sectionStyles}>
          <TitleBox>
            <St.Title>당신은 어떤 사람인가요?</St.Title>
            <St.Title>회원님의 기본 프로필을 채워주세요</St.Title>
          </TitleBox>
          <div
            css={{ display: 'flex', flexDirection: 'column', gap: '3.9rem' }}
          >
            <RegisterBasicInput label="닮은 동물상">
              <></>
            </RegisterBasicInput>
            <RegisterBasicInput label="직무">
              <StBasicInput
                type="text"
                placeholder="직장 내에서의 직무를 입력해 주세요."
              />
            </RegisterBasicInput>
            <RegisterBasicInput label="키">
              <StBasicInput
                type="text"
                placeholder="자신의 대략적인 키(cm)를 입력해 주세요."
              />
            </RegisterBasicInput>
            <RegisterBasicInput label="MBTI">
              <StBasicInput
                type="text"
                placeholder="자신의 MBTI 유형을 선택해 주세요."
              />
            </RegisterBasicInput>
            <RegisterBasicInput label="결혼 상태">
              <></>
            </RegisterBasicInput>
            <RegisterBasicInput label="종교">
              <></>
            </RegisterBasicInput>
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

export default 기본프로필입력1;

const TitleBox = styled(St.TitleBox)`
  margin-bottom: 5.4rem;
`;
