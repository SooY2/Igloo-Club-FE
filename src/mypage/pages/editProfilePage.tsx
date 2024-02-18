import { css } from '@emotion/react';
import { theme } from '../../common/styles/theme';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from '../assets/svgs/index';
import styled from '@emotion/styled';
import {
  StBasicBox,
  StBasicInput,
} from '../../register/styles/registerInputStyles';
import {
  RegisterArrowInput,
  RegisterBasicInput,
} from '../../register/components/RegisterInputs';
import { Registertypes } from '../../register/types/registerTypes';
import { ChangeEvent, useEffect, useState } from 'react';
import Radio from '../../register/components/Radio';
import onlyAbleNumber from '../../common/utils/onlyAbleNumber';
import RadioItem from '../../register/components/RadioItem';
import {
  ALCOHOL,
  ANIMALIMAGES,
  FACEDEPICTION,
  HOBBY,
  // MBTI,
  PERSONALITYDEPICTION,
  RELIGION,
  SMOKE,
} from '../../register/constants/profileConstants';
import { findLabelByValue } from '../../common/utils/findLabelByValue';
import * as St from '../../register/styles/registerStyles';
import FaceDepictionList from '../../register/components/FaceDepictionList';
import PersonalityDepiction from '../../register/components/PersonalityDepiction';
import HobbyList from '../../register/components/HobbyList';
import { limitMaxLength } from '../../common/utils/limitMaxLength';
import instance from '../../common/apis/axiosInstanse';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [showFaceDepiction, setShowFaceDepction] = useState(false);
  const [showPersonalityDepiction, setShowPersonalityDepiction] =
    useState(false);
  const [showHobby, setShowHobby] = useState(false);
  const [descriptionCnt, setDescriptionCnt] = useState(0);
  const [values, setValues] = useState<Registertypes>({
    nickname: '',
    sex: '',
    birthdate: '',
    contactKakao: null,
    contactInstagram: null,
    animalFace: '',
    job: '',
    height: '',
    mbti: '',
    marriageState: '',
    religion: '',
    alcohol: '',
    smoke: '',
    faceDepictionList: [],
    personalityDepictionList: [],
    description: '',
    markerList: [],
    hobbyList: [],
  });

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const { data } = await instance.get('api/member');
      setValues(data);
    } catch (err) {
      console.log(err);
    }
  };

  const patchData = async () => {
    try {
      await instance.patch('api/member', values);
      alert('수정이 완료되었습니다.');
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickBtn = () => {
    navigate('/mypage');
  };

  const handleEditValue = (
    value: string | string[] | number,
    name?: string,
  ) => {
    if (!name) return;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value === '') {
      setDescriptionCnt(0);
      handleEditValue('', 'description');
    } //value가 없을 때 0으로 글자 수 세지도록 처리

    const lengthCount = limitMaxLength(e, 100);

    if (!lengthCount) return;
    handleEditValue(e.target.value, 'description');
    setDescriptionCnt(lengthCount);
  };

  return (
    <div css={container}>
      <header css={headerStyles}>
        <StArrow onClick={handleClickBtn} />
        <StHeaderTitle>기본 프로필 수정</StHeaderTitle>
      </header>
      <main css={mainStyles}>
        <StTitle>기본 정보</StTitle>
        {/* 닉네임 */}
        <RegisterBasicInput label="닉네임">
          <StBasicInput
            type="text"
            placeholder="닉네임은 8자 이내로 입력할 수 있어요."
            value={values.nickname}
            onChange={(e) => handleEditValue(e.target.value, 'nickname')}
          />
        </RegisterBasicInput>
        {/* 성별 */}
        <RegisterBasicInput label="성별" explain="성별은 변경할 수 없어요">
          <Radio
            name="gender"
            value1="FEMALE"
            value2="MALE"
            label1="여성"
            label2="남성"
            checkedValue={values.sex}
          />
        </RegisterBasicInput>
        {/* 생년월일 */}
        <RegisterBasicInput label="생년월일">
          <StBasicInput
            type="text"
            placeholder="생년월일을 숫자만 차례대로 입력하세요  예) 20020506"
            value={values.birthdate}
            onChange={(e) =>
              handleEditValue(
                onlyAbleNumber(e.target.value.slice(0, 8)),
                'birthdate',
              )
            }
          />
        </RegisterBasicInput>
        {/* 닮은 동물상 */}
        <RegisterBasicInput label="닮은 동물상">
          <div css={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
            {ANIMALIMAGES.map((item) => {
              const { label, value, animalImg } = item;
              return (
                <RadioItem
                  key={value}
                  value={value}
                  name="animalFace"
                  onRadioChange={handleEditValue}
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
        {/* 직무 */}
        <RegisterBasicInput label="직무">
          <StBasicInput
            type="text"
            placeholder="직장 내에서의 직무를 입력해 주세요."
            value={values.job}
            onChange={(e) => {
              handleEditValue(e.target.value, 'job');
            }}
          />
        </RegisterBasicInput>
        {/* 키 */}
        <RegisterBasicInput label="키">
          <StBasicInput
            type="number"
            placeholder="자신의 대략적인 키(cm)를 입력해 주세요."
            value={values.height}
            onChange={(e) => {
              handleEditValue(Number(e.target.value), 'height');
            }}
          />
        </RegisterBasicInput>
        <RegisterBasicInput label="MBTI">
          <p>istj</p>
        </RegisterBasicInput>
        {/* 결혼 상태 */}
        <RegisterBasicInput label="결혼 상태">
          <Radio
            name="marriageState"
            value1="SINGLE"
            value2="AGAIN_SINGLE"
            label1="미혼(돌싱 아님)"
            label2="돌싱"
            onRadioChange={handleEditValue}
            checkedValue={values.marriageState}
          />
        </RegisterBasicInput>
        {/* 종교 */}
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
                  onRadioChange={handleEditValue}
                  profile={true}
                  checkedValue={values.religion}
                />
              );
            })}
          </div>
        </RegisterBasicInput>
        {/* 흡연량 */}
        <RegisterBasicInput label="흡연량">
          <div css={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
            {SMOKE.map((item) => (
              <RadioItem
                key={item.value}
                value={item.value}
                name="smoke"
                onRadioChange={handleEditValue}
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
                onRadioChange={handleEditValue}
                profile={true}
                checkedValue={values.alcohol}
              />
            ))}
          </div>
        </RegisterBasicInput>
        {/* 나의 외모 묘사 */}
        <RegisterArrowInput
          label="나의 외모 묘사"
          onClick={() => setShowFaceDepction(true)}
        >
          <StBasicBox>
            {values.faceDepictionList.length === 0 ? (
              <p>자신의 외모를 설명할 수 있는 키워드를 선택해 주세요.</p>
            ) : (
              findLabelByValue(FACEDEPICTION, values.faceDepictionList)
            )}
          </StBasicBox>
        </RegisterArrowInput>
        {/* 나의 성격 묘사 */}
        <RegisterArrowInput
          label="나의 성격 묘사"
          onClick={() => {
            setShowPersonalityDepiction(true);
          }}
        >
          <StBasicBox>
            {values.personalityDepictionList.length === 0 ? (
              <p>자신의 성격을 설명할 수 있는 키워드를 선택해 주세요.</p>
            ) : (
              findLabelByValue(
                PERSONALITYDEPICTION,
                values.personalityDepictionList,
              )
            )}
          </StBasicBox>
        </RegisterArrowInput>
        {/* 나의 취미 */}
        <RegisterArrowInput
          label="나의 취미"
          onClick={() => {
            setShowHobby(true);
          }}
        >
          <StBasicBox>
            {values.hobbyList.length === 0 ? (
              <p>평소 나의 취미를 선택해 주세요.</p>
            ) : (
              findLabelByValue(HOBBY, values.hobbyList)
            )}
          </StBasicBox>
        </RegisterArrowInput>
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
            <St.StBasicTextCnt>{descriptionCnt}/1000</St.StBasicTextCnt>
          </div>
        </RegisterBasicInput>
      </main>
      <div css={finishContainer}>
        <button type="button" onClick={patchData} css={FinishBtn}>
          프로필 수정 완료하기
        </button>
      </div>
      {showFaceDepiction && (
        <FaceDepictionList
          values={values.faceDepictionList}
          handleValues={handleEditValue}
          setShowFaceDepiction={setShowFaceDepction}
        />
      )}
      {showPersonalityDepiction && (
        <PersonalityDepiction
          values={values.personalityDepictionList}
          handleValues={handleEditValue}
          setShowPersonalityDepiction={setShowPersonalityDepiction}
        />
      )}
      {showHobby && (
        <HobbyList
          values={values.hobbyList}
          handleValues={handleEditValue}
          setShowHobby={setShowHobby}
        />
      )}
    </div>
  );
};

export default EditProfilePage;

const container = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding-top: 1.5rem;
  overflow: auto;
  background: ${theme.colors.white};
`;

const headerStyles = css`
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 42.5rem;
  height: 6.7rem;
  background-color: white;
`;

const StArrow = styled(ArrowLeft)`
  position: absolute;
  left: 1.7rem;
`;

const StHeaderTitle = styled.h1`
  color: ${({ theme }) => theme.colors.gray9};
  ${({ theme }) => theme.fonts.body2b};
`;

const StTitle = styled.h2`
  ${({ theme }) => theme.fonts.title};
`;

const mainStyles = css`
  display: flex;
  flex-direction: column;
  gap: 3.6rem;
  padding: 2.7rem;
  margin: 7rem 0;
  overflow-y: scroll;
`;

// const FinishBtn = css`
//   position: sticky;
//   bottom: 0;
//   z-index: 999;
// `;

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

const finishContainer = css`
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  max-width: 42.5rem;
  height: 9rem;
  padding: 2.2rem;
  background: ${theme.colors.white};
  border-top: 1px solid #e3e3e3;
`;

const FinishBtn = css`
  display: flex;
  flex-direction: row;
  gap: 0.9rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5.5rem;
  padding: 1.5rem 10rem;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${theme.colors.white};
  text-align: center;
  background-color: ${theme.colors.primary};
  border-radius: 15px;

  &:hover {
    cursor: pointer;
  }
`;
