import { useEffect, useState } from 'react';
import RegisterBtn from '../components/RegisterBtn';
import RegisterHeader from '../components/RegisterHeader';
import * as St from '../styles/registerStyles';
import { StBasicInput } from '../styles/registerInputStyles';
import { RegisterBasicInput } from '../components/RegisterInputs';
import styled from '@emotion/styled';
import { NavTypesProps } from '../types/navTypes';
import Radio from '../components/Radio';

const SNS계정 = ({ onPrev, onNext }: NavTypesProps) => {
  const [isActive, setIsActive] = useState(false);
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState('');

  useEffect(() => {
    if (gender && birth) setIsActive(true);
    else setIsActive(false);
  }, [gender, birth]);

  const handleSubmit = () => {
    //서버통신
    onNext();
  };

  return (
    <>
      <RegisterHeader percent={70} onPrev={onPrev} />
      <article css={St.articleStyles}>
        <section css={St.sectionStyles}>
          <TitleBox>
            <St.Title>상대방과 연락을 주고 받을 때 쓰일</St.Title>
            <St.Title>SNS 계정 아이디를 알려주세요</St.Title>
          </TitleBox>
          <div
            css={{ display: 'flex', flexDirection: 'column', gap: '3.9rem' }}
          >
            <RegisterBasicInput label="SNS 계정 유형">
              <Radio
                name="gender"
                value1="카카오톡"
                value2="인스타그램"
                onRadioChange={setGender}
              />
            </RegisterBasicInput>
            <RegisterBasicInput
              label="SNS 계정 아이디"
              explain="서로의 눈길이 매칭 되었을 시, 상대방에게 보이게 됩니다. "
            >
              <StBasicInput
                type="text"
                placeholder="아이디를 정확히 입력해 주세요."
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
              />
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

export default SNS계정;

const TitleBox = styled(St.TitleBox)`
  margin-bottom: 5.4rem;
`;
