import { useEffect, useState } from 'react';
import RegisterBtn from '../components/RegisterBtn';
import RegisterHeader from '../components/RegisterHeader';
import * as St from '../styles/registerStyles';
import { StBasicInput } from '../styles/registerInputStyles';
import { RegisterBasicInput } from '../components/RegisterInputs';
import styled from '@emotion/styled';
import { ExtendedNavTypesProps } from '../types/navTypes';
import { css } from '@emotion/react';
import RadioItem from '../components/RadioItem';
import { ANIMALIMAGES, MBTI, RELIGION } from '../constants/profileConstants';
import Radio from '../components/Radio';
import { Registertypes } from '../types/registerTypes';

const 기본프로필입력1 = ({
  onPrev,
  onNext,
  handleRegisterValue,
  registerValues,
}: ExtendedNavTypesProps) => {
  const [isActive, setIsActive] = useState(false);
  const [mbti, setMbti] = useState<{ [key: string]: string }>({
    mbti1: registerValues.mbti[0],
    mbti2: registerValues.mbti[1],
    mbti3: registerValues.mbti[2],
    mbti4: registerValues.mbti[3],
  });
  const [values, setValues] = useState<Registertypes>(registerValues);

  useEffect(() => {
    const { animalFace, job, height, mbti, marriageState, religion } = values;
    if (animalFace && job && height && mbti && marriageState && religion)
      setIsActive(true);
    else setIsActive(false);
  }, [values]);

  useEffect(() => {
    const mbtiString = Object.values(mbti).join('');
    handleValues(mbtiString, 'mbti');
  }, [mbti]);

  const handleValues = (value: string | string[] | number, name?: string) => {
    if (!name) return;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  //mbti 핸들러
  const handleMbti = (value: string, name?: string) => {
    if (!name) return;
    setMbti((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  //다음으로
  const handleSubmit = () => {
    if (!handleRegisterValue || !values.height) return;
    handleRegisterValue(values);
    onNext();
  };

  return (
    <>
      <RegisterHeader percent={80} onPrev={onPrev} />
      <article css={St.articleStyles}>
        <section css={St.sectionStyles}>
          <StTitleBox>
            <St.Title>당신은 어떤 사람인가요?</St.Title>
            <St.Title>회원님의 기본 프로필을 채워주세요</St.Title>
          </StTitleBox>
          <div css={subTitleBoxStyles}>
            <St.SubTitle>
              기본 프로필은 상대방에게 보여지는 첫인상이에요.
            </St.SubTitle>
            <St.SubTitle>있는 그대로, 신중하게 입력해 주세요.</St.SubTitle>
          </div>
          <div
            css={{ display: 'flex', flexDirection: 'column', gap: '3.9rem' }}
          >
            <RegisterBasicInput label="닮은 동물상">
              <div css={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                {ANIMALIMAGES.map((item) => {
                  const { label, value, animalImg } = item;
                  return (
                    <RadioItem
                      key={value}
                      value={value}
                      name="animalFace"
                      onRadioChange={handleValues}
                      profile={true}
                      checkedValue={values.animalFace}
                    >
                      <StAnimalFace>
                        <StAnimalRaceImg src={animalImg} alt={label} />
                        <p>{label}</p>
                      </StAnimalFace>
                    </RadioItem>
                  );
                })}
              </div>
            </RegisterBasicInput>
            <RegisterBasicInput label="직무">
              <StBasicInput
                type="text"
                placeholder="직장 내에서의 직무를 입력해 주세요."
                value={values.job}
                onChange={(e) => {
                  handleValues(e.target.value, 'job');
                }}
              />
            </RegisterBasicInput>
            <RegisterBasicInput label="키">
              <StBasicInput
                type="number"
                placeholder="자신의 대략적인 키(cm)를 입력해 주세요."
                value={values.height}
                onChange={(e) => {
                  handleValues(Number(e.target.value), 'height');
                }}
              />
            </RegisterBasicInput>
            <RegisterBasicInput label="MBTI">
              <div css={{ display: 'flex', gap: '1rem' }}>
                {MBTI.map((item) => {
                  const { name, value1, value2 } = item;
                  return (
                    <Radio
                      key={name}
                      name={name}
                      value1={value1}
                      value2={value2}
                      onRadioChange={handleMbti}
                      column={true}
                      checkedValue={mbti[name]}
                    />
                  );
                })}
              </div>
            </RegisterBasicInput>
            <RegisterBasicInput label="결혼 상태">
              <Radio
                name="marriageState"
                value1="SINGLE"
                value2="AGAIN_SINGLE"
                label1="미혼(돌싱 아님)"
                label2="돌싱"
                onRadioChange={handleValues}
                checkedValue={values.marriageState}
              />
            </RegisterBasicInput>
            <RegisterBasicInput label="종교">
              <div css={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                {RELIGION.map((item) => {
                  const { label, value } = item;
                  return (
                    <RadioItem
                      key={value}
                      value={value}
                      label={label}
                      name="religion"
                      onRadioChange={handleValues}
                      profile={true}
                      checkedValue={values.religion}
                    />
                  );
                })}
              </div>
            </RegisterBasicInput>
          </div>
        </section>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.7rem',
          }}
        >
          <St.StBtnExplain>
            프로필 응답 내역은 언제든지 마이페이지에서 변경 가능해요
          </St.StBtnExplain>
          <RegisterBtn
            isActive={isActive}
            content="다음으로"
            onClick={handleSubmit}
          />
        </div>
      </article>
    </>
  );
};

export default 기본프로필입력1;

const StTitleBox = styled(St.TitleBox)`
  margin-bottom: 2.8rem;
`;

const subTitleBoxStyles = css`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 5.3rem;
`;

const StAnimalFace = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: center;
  justify-content: center;
  width: fit-content;

  ${({ theme }) => theme.fonts.body2r};
`;

const StAnimalRaceImg = styled.img`
  width: 2.1rem;
`;
