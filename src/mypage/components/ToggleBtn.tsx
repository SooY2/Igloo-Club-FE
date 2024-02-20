import { useState, useEffect } from 'react';
import instance from '../../common/apis/axiosInstanse';
import styled from '@emotion/styled';

interface ToggleBtnProps {
  disableCompany: boolean;
}

const ToggleBtn = ({ disableCompany }: ToggleBtnProps) => {
  const [isOn, setIsOn] = useState<boolean>(disableCompany);

  useEffect(() => {
    setIsOn(disableCompany);
  }, [disableCompany]);

  const handleToggle = async () => {
    setIsOn((prevIsOn) => !prevIsOn);
    try {
      await instance.patch('/api/member/company/toggle', {
        disableCompany: !isOn,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <StToggleContainer onClick={handleToggle}>
        <StToggleWrapper isOn={isOn} />
        <StToggleCircle isOn={isOn}>
          {isOn ? (
            <StToggleState>ON</StToggleState>
          ) : (
            <StToggleState>OFF</StToggleState>
          )}
        </StToggleCircle>
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
  background-color: ${({ isOn, theme }) =>
    isOn ? `${theme.colors.primary}` : '#d3d2d2'};
  border-radius: 30px;
  transition: background-color 0.5s ease-in-out;
`;

const StToggleCircle = styled.div<{ isOn: boolean }>`
  position: absolute;
  top: 0.1rem;
  left: ${({ isOn }) => (isOn ? '2.7rem' : '0.1rem')};
  width: 2.2rem;
  height: 2.2rem;
  background-color: #fff;
  border-radius: 50px;
  transition: left 0.5s ease-in-out;
`;

const StToggleState = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 1rem;
  font-weight: 700;
`;
