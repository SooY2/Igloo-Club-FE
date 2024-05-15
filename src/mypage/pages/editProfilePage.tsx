import { css } from '@emotion/react';
import { theme } from '../../common/styles/theme';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from '../assets/svgs/index';
import styled from '@emotion/styled';
import {
  StBasicBox,
  StBasicInput,
} from '../../register/styles/registerInputStyles';
import { RegisterBasicInput } from '../../register/components/RegisterInputs';
import { Registertypes } from '../../register/types/registerTypes';
import { ChangeEvent, useEffect, useState } from 'react';
import Radio from '../../register/components/Radio';
import {
  ANIMALIMAGES,
  FACEDEPICTION,
  HOBBY,
  // MBTI,
  PERSONALITYDEPICTION,
} from '../../register/constants/profileConstants';
import { findLabelByValue } from '../../common/utils/findLabelByValue';
import * as St from '../../register/styles/registerStyles';

import { limitMaxLength } from '../../common/utils/limitMaxLength';
import instance from '../../common/apis/axiosInstanse';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [descriptionCnt, setDescriptionCnt] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
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
    hobbyList: [],
    disableCompany: false,
  });

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      setIsLoading(true);
      const { data } = await instance.get('api/member');
      setValues(data);
      setDescriptionCnt(data.description.length);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
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
    navigate(-1);
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

    const lengthCount = limitMaxLength(e, 50);

    if (!lengthCount) return;
    handleEditValue(e.target.value, 'description');
    setDescriptionCnt(lengthCount);
  };

  return isLoading ? (
    <>Loading..</>
  ) : (
    <div css={container}>
      <header css={headerStyles}>
        <StArrow onClick={handleClickBtn} />
        <StHeaderTitle>기본 프로필 수정</StHeaderTitle>
      </header>
      <main css={mainStyles}>
        <StTitle>기본 정보</StTitle>
        {/* 닉네임 */}
        <RegisterBasicInput
          label="닉네임"
          explain="닉네임과 소개글만 수정할 수 있어요"
        >
          <StBasicInput
            type="text"
            placeholder="닉네임은 8자 이내로 입력할 수 있어요."
            value={values.nickname}
            onChange={(e) => handleEditValue(e.target.value, 'nickname')}
          />
        </RegisterBasicInput>
        {/* 소개글 */}
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
            <St.StBasicTextCnt>{descriptionCnt}/50</St.StBasicTextCnt>
          </div>
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
          />
        </RegisterBasicInput>
        {/* 닮은 동물상 */}
        <RegisterBasicInput label="닮은 동물상">
          <StAnimalFace>
            <StAnimalRaceImg
              src={
                ANIMALIMAGES.find((item) => item.value === values.animalFace)
                  ?.animalImg
              }
              alt={
                ANIMALIMAGES.find((item) => item.value === values.animalFace)
                  ?.label
              }
            />
            <p>
              {
                ANIMALIMAGES.find((item) => item.value === values.animalFace)
                  ?.label
              }
            </p>
          </StAnimalFace>
        </RegisterBasicInput>
        {/* 직무 */}
        <RegisterBasicInput label="학과">
          <StBasicInput
            type="text"
            placeholder="학과를 입력해주세요"
            value={values.job}
          />
        </RegisterBasicInput>

        <RegisterBasicInput label="MBTI">
          <p>{values.mbti}</p>
        </RegisterBasicInput>

        {/* 나의 외모 묘사 */}
        <RegisterBasicInput label="나의 외모 묘사">
          <StBasicBox>
            {values.faceDepictionList.length === 0 ? (
              <p>자신의 외모를 설명할 수 있는 키워드를 선택해 주세요.</p>
            ) : (
              findLabelByValue(FACEDEPICTION, values.faceDepictionList)
            )}
          </StBasicBox>
        </RegisterBasicInput>
        {/* 나의 성격 묘사 */}
        <RegisterBasicInput label="나의 성격 묘사">
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
        </RegisterBasicInput>
        {/* 나의 취미 */}
        <RegisterBasicInput label="나의 취미">
          <StBasicBox>
            {values.hobbyList.length === 0 ? (
              <p>평소 나의 취미를 선택해 주세요.</p>
            ) : (
              findLabelByValue(HOBBY, values.hobbyList)
            )}
          </StBasicBox>
        </RegisterBasicInput>
      </main>
      <div css={finishContainer}>
        <button type="button" onClick={patchData} css={FinishBtn}>
          프로필 수정 완료하기
        </button>
      </div>
      {/* {showFaceDepiction && (
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
      )} */}
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
  overflow: hidden;
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
