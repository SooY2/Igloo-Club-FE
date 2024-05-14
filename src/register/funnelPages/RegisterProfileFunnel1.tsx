import { ChangeEvent, useEffect, useState } from 'react';
import RegisterBtn from '../components/RegisterBtn';
import RegisterHeader from '../components/RegisterHeader';
import * as St from '../styles/registerStyles';
import { StBasicInput } from '../styles/registerInputStyles';
import { RegisterBasicInput } from '../components/RegisterInputs';
import styled from '@emotion/styled';
import { ExtendedNavTypesProps } from '../types/navTypes';
import { css } from '@emotion/react';
import RadioItem from '../components/RadioItem';
import { ANIMALIMAGES, MBTI } from '../constants/profileConstants';
import Radio from '../components/Radio';
import { Registertypes } from '../types/registerTypes';
import { limitMaxLength } from '../../common/utils/limitMaxLength';
const MAXLEN = 50;
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
  const [descriptionCnt, setDescriptionCnt] = useState(0);

  useEffect(() => {
    const { animalFace, job, mbti, description } = values;
    if (animalFace && job && mbti && description) setIsActive(true);
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
  //소개글 핸들러
  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value === '') {
      setDescriptionCnt(0);
      handleValues('', 'description');
    } //value가 없을 때 0으로 글자 수 세지도록 처리

    const lengthCount = limitMaxLength(e, MAXLEN);

    if (!lengthCount) return;
    handleValues(e.target.value, 'description');
    setDescriptionCnt(lengthCount);
  };

  //다음으로
  const handleSubmit = () => {
    if (!handleRegisterValue) return;
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
            <St.Title>기본 프로필을 채워주세요</St.Title>
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
            <RegisterBasicInput label="학과">
              <StBasicInput
                type="text"
                placeholder="현재 속해있는 학과명을 입력해주세요"
                value={values.job}
                onChange={(e) => {
                  handleValues(e.target.value, 'job');
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
            <RegisterBasicInput label="소개글">
              <div
                css={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.9rem',
                }}
              >
                <details>
                  <summary>가이드라인을 보려면 클릭하세요!</summary>
                  <St.SubTitle
                    css={{
                      border: '1px solid rgb(250 114 104)',
                      borderRadius: '20px',
                      padding: '1rem',
                      marginTop: '1rem',
                      lineHeight: '1.8rem',
                    }}
                  >
                    마음만은 새내기인 21학번입니다! 공강 때 같이 축제 부스
                    구경하실 분!!~
                  </St.SubTitle>
                </details>
                <St.StBasicTextArea
                  placeholder="회원님이 어떤 사람인지 간결하고 임팩트있게 작성해주세요 "
                  value={values.description}
                  onChange={handleDescription}
                />
                <St.StBasicTextCnt>
                  {descriptionCnt}/{MAXLEN}
                </St.StBasicTextCnt>
              </div>
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
