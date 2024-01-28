import { useEffect, useState } from 'react';
import RegisterBtn from '../components/RegisterBtn';
import RegisterHeader from '../components/RegisterHeader';
import * as St from '../styles/registerStyles';
import { StBasicInput } from '../styles/registerInputStyles';
import { RegisterBasicInput } from '../components/RegisterInputs';
import styled from '@emotion/styled';
import { NavTypesProps } from '../types/navTypes';
import onlyAbleNumber from '../../common/utils/onlyAbleNumber';
import Radio from '../components/Radio';

const 성별생년월일 = ({ onPrev, onNext }: NavTypesProps) => {
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
      <RegisterHeader percent={25} onPrev={onPrev} />
      <article css={St.articleStyles}>
        <section css={St.sectionStyles}>
          <TitleBox>
            <St.Title>소개팅 서비스의 필수 정보!</St.Title>
            <St.Title>성별과 생년월일을 입력해 주세요</St.Title>
          </TitleBox>
          <div
            css={{ display: 'flex', flexDirection: 'column', gap: '3.9rem' }}
          >
            <RegisterBasicInput
              label="성별"
              explain="성별은 추후에 바꿀 수 없으니 정확하게 선택해 주세요."
            >
              <Radio
                name="gender"
                value1="여성"
                value2="남성"
                onRadioChange={setGender}
              />
            </RegisterBasicInput>
            <RegisterBasicInput label="생년월일">
              <StBasicInput
                type="text"
                placeholder="생년월일을 숫자만 차례대로 입력하세요  예) 20020506"
                value={birth}
                onChange={(e) => setBirth(onlyAbleNumber(e.target.value))}
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

export default 성별생년월일;

const TitleBox = styled(St.TitleBox)`
  margin-bottom: 5.4rem;
`;
