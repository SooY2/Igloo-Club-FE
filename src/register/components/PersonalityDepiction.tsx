import styled from '@emotion/styled';
import { ArrowLeft } from '../assets/svgs/0_index';
import * as St from '../styles/registerStyles';
import RegisterBtn from './RegisterBtn';
import { PERSONALITYDEPICTION } from '../constants/profileConstants';
import { Dispatch, SetStateAction, useState } from 'react';
import CheckBoxItem from './CheckBoxItem';

interface PersonalityDepictionProps {
  values: string[];
  handleValues: (value: string | string[], name?: string) => void;
  setShowPersonalityDepiction: Dispatch<SetStateAction<boolean>>;
}

const PersonalityDepiction = ({
  values,
  handleValues,
  setShowPersonalityDepiction,
}: PersonalityDepictionProps) => {
  const [thisValues, setThisValues] = useState<string[]>(values);

  const handleSubmit = () => {
    handleValues(thisValues, 'personalityDepictionList');
    setShowPersonalityDepiction(false);
  };

  return (
    <StBackgroud>
      <ArrowLeft onClick={() => setShowPersonalityDepiction(false)} />
      <StArticleStyles>
        <section css={St.sectionStyles}>
          <St.TitleBox>
            <St.Title>회원님의 성격을 가장 잘 나타내는</St.Title>
            <St.Title>키워드를 여러 개 선택해 주세요</St.Title>
            <St.SubTitle>필수 3개부터 최대 5개까지 선택가능해요</St.SubTitle>
          </St.TitleBox>
          <div css={St.checkBoxContainerStyles}>
            {PERSONALITYDEPICTION.map((item) => {
              const { label, value } = item;
              return (
                <CheckBoxItem
                  key={value}
                  value={value}
                  name="personalityDepictionList"
                  setValues={setThisValues}
                  label={label}
                  values={thisValues}
                  limit={5}
                />
              );
            })}
          </div>
        </section>

        <RegisterBtn
          isActive={thisValues.length > 2}
          content="선택완료"
          onClick={handleSubmit}
        />
      </StArticleStyles>
    </StBackgroud>
  );
};

export default PersonalityDepiction;

const StBackgroud = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  padding: 3.3rem 2rem;
  background-color: ${({ theme }) => theme.colors.white};
`;

const StArticleStyles = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding-top: 5.3rem;
  overflow-y: scroll;
`;
