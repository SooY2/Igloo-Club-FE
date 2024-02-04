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
import { ALCOHOL, SMOKE } from '../constants/profileConstants';
import { limitMaxLength } from '../../common/utils/limitMaxLength';
import { Registertypes } from '../types/registerTypes';
import instance from '../../common/apis/axiosInstanse';

const MAXLEN = 100;

const 기본프로필입력2 = ({
  onPrev,
  onNext,
  registerValues,
}: ExtendedNavTypesProps) => {
  const [isActive, setIsActive] = useState(false);
  const [descriptionCnt, setDescriptionCnt] = useState(0);
  const [values, setValues] = useState<Registertypes>(registerValues);

  useEffect(() => {
    const {
      alcohol,
      smoke,
      faceDepictionList,
      personalityDepictionList,
      description,
    } = values;
    if (
      alcohol &&
      smoke &&
      faceDepictionList &&
      personalityDepictionList &&
      description
    )
      setIsActive(true);
    else setIsActive(false);
  }, [values]);

  const handleValues = (value: string | string[], name?: string) => {
    if (!name) return;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

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
  const handleSubmit = async () => {
    try {
      await instance.post('/api/member', values);
      onNext();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <RegisterHeader percent={100} onPrev={onPrev} />
      <article css={St.articleStyles}>
        <section css={St.sectionStyles}>
          <StTitleBox>
            <St.Title>이제 정말 마지막이에요!</St.Title>
            <St.Title>기본 프로필을 마저 채워주세요</St.Title>
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
            <RegisterBasicInput label="흡연량">
              <div css={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                {SMOKE.map((item) => (
                  <RadioItem
                    key={item.value}
                    value={item.value}
                    name="smoke"
                    onRadioChange={handleValues}
                    profile={true}
                    label={item.label}
                    checkedValue={values.smoke}
                  />
                ))}
              </div>
            </RegisterBasicInput>
            <RegisterBasicInput label="음주량">
              <div css={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                {ALCOHOL.map((item) => (
                  <RadioItem
                    key={item.value}
                    value={item.value}
                    name="alcohol"
                    label={item.label}
                    onRadioChange={handleValues}
                    profile={true}
                    checkedValue={values.alcohol}
                  />
                ))}
              </div>
            </RegisterBasicInput>
            <RegisterBasicInput label="나의 외모 묘사">
              <StBasicInput
                type="text"
                placeholder="자신의 외모를 설명할 수 있는 키워드를 선택해 주세요."
                value={values.faceDepictionList}
                onChange={(e) => {
                  handleValues([e.target.value], 'faceDepictionList');
                }}
              />
            </RegisterBasicInput>
            <RegisterBasicInput label="나의 성격 묘사">
              <StBasicInput
                type="text"
                placeholder="자신의 성격을 설명할 수 있는 키워드를 선택해 주세요."
                value={values.personalityDepictionList}
                onChange={(e) => {
                  handleValues([e.target.value], 'personalityDepictionList');
                }}
              />
            </RegisterBasicInput>
            <RegisterBasicInput label="소개글">
              <div
                css={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.9rem',
                }}
              >
                <St.StBasicTextArea
                  placeholder="회원님이 어떤 사람인지 자신만의 언어로 자유롭게 소개해주세요. 자세히 작성할 수록 매칭률이 높아져요! "
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

export default 기본프로필입력2;

const StTitleBox = styled(St.TitleBox)`
  margin-bottom: 2.8rem;
`;

const subTitleBoxStyles = css`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 5.3rem;
`;
