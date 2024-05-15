import styled from '@emotion/styled';
import { ArrowLeft } from '../assets/svgs/0_index';
import * as St from '../styles/registerStyles';
import RegisterBtn from './RegisterBtn';
import { HOBBY } from '../constants/profileConstants';
import { useState } from 'react';
import CheckBoxItem from './CheckBoxItem';
import { ExtendedNavTypesProps } from '../types/navTypes';
import { Registertypes } from '../types/registerTypes';
import instance from '../../common/apis/axiosInstanse';

interface HobbyListProps extends ExtendedNavTypesProps {
  values: string[];
  handleValues: (value: string | string[], name?: string) => void;
}

const HobbyList = ({
  values,
  onNext,
  onPrev,
  registerValues,
}: HobbyListProps) => {
  const [thisValues, setThisValues] = useState<string[]>(values);
  const [thisRegisterValues] = useState<Registertypes>(registerValues);

  const handleSubmit = () => {
    const updatedRegisterValues = {
      ...thisRegisterValues,
      hobbyList: thisValues,
    };
    // 상태를 업데이트합니다.
    postSubmit(updatedRegisterValues);

    onNext();
  };

  //데이터 보내기
  const postSubmit = async (value: Registertypes) => {
    try {
      await instance.patch('/api/member', value);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StBackgroud>
      <ArrowLeft onClick={() => onPrev()} />
      <StArticleStyles>
        <section css={St.sectionStyles}>
          <St.TitleBox>
            <St.Title>회원님의 취미는 무엇인가요?</St.Title>
            <St.Title>평소 즐겨하시는 취미를 선택해 주세요</St.Title>
            <St.SubTitle>필수 3개부터 최대 5개까지 선택가능해요</St.SubTitle>
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

export default HobbyList;

const StBackgroud = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 3.3rem 2rem;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.colors.white};
`;

const StArticleStyles = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
  padding-top: 3rem;
`;
