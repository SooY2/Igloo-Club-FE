import { useEffect, useState } from 'react';
import RegisterBtn from '../components/RegisterBtn';
import RegisterHeader from '../components/RegisterHeader';
import * as St from '../styles/registerStyles';
import { StBasicInput } from '../styles/registerInputStyles';
import { RegisterBasicInput } from '../components/RegisterInputs';
import styled from '@emotion/styled';
import { ExtendedNavTypesProps } from '../types/navTypes';
import onlyAbleNumber from '../../common/utils/onlyAbleNumber';
import Radio from '../components/Radio';

const 성별생년월일 = ({
  onPrev,
  onNext,
  handleRegisterValue,
  registerValues,
}: ExtendedNavTypesProps) => {
  const [isActive, setIsActive] = useState(false);
  const [gender, setGender] = useState(registerValues.sex);
  const [birth, setBirth] = useState(registerValues.birthdate);

  useEffect(() => {
    if (gender && birth) setIsActive(true);
    else setIsActive(false);
  }, [gender, birth]);

  const handleSubmit = () => {
    if (handleRegisterValue) {
      handleRegisterValue({
        ...registerValues,
        sex: gender,
        birthdate: birth,
      });
    }

    onNext();
  };

  return (
    <>
      <RegisterHeader percent={70} onPrev={onPrev} />
      <article css={St.articleStyles}>
        <section css={St.sectionStyles}>
          <TitleBox>
            <St.Title>네트워킹의 필수 정보!</St.Title>
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
                value1="FEMALE"
                value2="MALE"
                label1="여성"
                label2="남성"
                onRadioChange={setGender}
                checkedValue={gender}
              />
            </RegisterBasicInput>
            <RegisterBasicInput
              label="생년월일"
              explain="생년월일을 정확히 입력하지 않으면 추후 서비스 이용에 문제가 생길 수 있어요. 정확하게 입력해주세요"
            >
              <StBasicInput
                type="text"
                placeholder="생년월일을 숫자만 차례대로 입력하세요  예) 20020506"
                value={birth}
                onChange={(e) =>
                  setBirth(onlyAbleNumber(e.target.value.slice(0, 8)))
                }
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
