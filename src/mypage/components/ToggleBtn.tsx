import { useState } from 'react';
import instance from '../../common/apis/axiosInstanse';
import styled from '@emotion/styled';

const ToggleBtn = () => {
  const [isOn, setIsOn] = useState<boolean>(false);

  const handleToggle = async () => {
    setIsOn((prevIsOn) => !prevIsOn);
    try {
      await instance.patch('/api/member/company/toggle');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <StToggleContainer onClick={handleToggle}>
        <StToggleWrapper isOn={isOn} />
        <StToggleCircle isOn={isOn} />
      </StToggleContainer>
    </>
  );
};

export default ToggleBtn;

const StToggleContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

const StToggleWrapper = styled.div<{ isOn: boolean }>`
  width: 5rem;
  height: 2.4rem;
  background-color: ${({ isOn }) => (isOn ? '#d3d2d2' : '#808482')};
  border-radius: 30px;
  transition: background-color 0.5s ease-in-out;
`;

const StToggleCircle = styled.div<{ isOn: boolean }>`
  position: absolute;
  top: 0.1rem;
  left: ${({ isOn }) => (isOn ? '0.1rem' : '2.7rem')};
  width: 2.2rem;
  height: 2.2rem;
  background-color: #fff;
  border-radius: 50px;
  transition: left 0.5s ease-in-out;
`;
