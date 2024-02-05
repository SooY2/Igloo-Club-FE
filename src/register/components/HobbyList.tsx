import styled from '@emotion/styled';
import { ArrowLeft } from '../assets/svgs/0_index';
import * as St from '../styles/registerStyles';
import RegisterBtn from './RegisterBtn';
import { HOBBY } from '../constants/profileConstants';
import { Dispatch, SetStateAction, useState } from 'react';
import CheckBoxItem from './CheckBoxItem';

interface HobbyListProps {
  values: string[];
  handleValues: (value: string | string[], name?: string) => void;
  setShowFaceDepiction: Dispatch<SetStateAction<boolean>>;
}

const HobbyList = ({
  values,
  handleValues,
  setShowFaceDepiction,
}: HobbyListProps) => {
  const [thisValues, setThisValues] = useState<string[]>(values);

  const handleSubmit = () => {
    handleValues(thisValues, 'hobbyList');
    setShowFaceDepiction(false);
  };
  return (
    <StBackgroud>
      <ArrowLeft />
      <StArticleStyles>
        <section css={St.sectionStyles}>
          <St.TitleBox>
            <St.Title>회원님의 취미는 무엇인가요?</St.Title>
            <St.Title>평소 즐겨하시는 취미를 선택해 주세요</St.Title>
          </St.TitleBox>
          <div css={St.checkBoxContainerStyles}>
            {HOBBY.map((item) => {
              const { label, value } = item;
              return (
                <CheckBoxItem
                  key={value}
                  value={value}
                  name="hobbyList"
                  setValues={setThisValues}
                  label={label}
                  values={thisValues}
                />
              );
            })}
          </div>
        </section>

        <RegisterBtn
          isActive={true}
          content="선택완료"
          onClick={handleSubmit}
        />
      </StArticleStyles>
    </StBackgroud>
  );
};

export default HobbyList;

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
