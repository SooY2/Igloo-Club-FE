import styled from '@emotion/styled';
import { css } from '@emotion/react';
import RegisterBtn from './RegisterBtn';
import { StBasicInput } from '../styles/registerInputStyles';
import { CancelIcon } from '../assets/svgs/0_index';
import { useEffect, useState } from 'react';

const COMPANYLIST = ['멋쟁이사자처럼', '멋사', 'LIKELION', '(주)멋사'];

const CompanyItem = ({
  name,
  onClick,
}: {
  name: string;
  onClick: () => void;
}) => {
  return (
    <StCompanyLabel onClick={onClick}>
      <StCompanyItem type="checkbox" />
      <StCompanyName>{name}</StCompanyName>
    </StCompanyLabel>
  );
};

const StCompanyLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StCompanyItem = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;

  &:checked + p {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.pressed_primary};
  }
`;

const StCompanyName = styled.p`
  padding: 1rem 1.7rem;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.gray3};
  border-radius: 30px;

  ${({ theme }) => theme.fonts.body2r};
`;

const CompanyNameModal = ({ onCancel }: { onCancel: () => void }) => {
  const [isActive, setIsActive] = useState(false);
  const [select, setSelect] = useState<string[]>([]);

  useEffect(() => {
    console.log(select);
    if (select.length > 0) setIsActive(true);
    else setIsActive(false);
  }, [select]);

  const handleSelect = (value: string): void => {
    if (select.includes(value)) {
      setSelect(select.filter((item) => item !== value));
    } else {
      setSelect([...select, value]);
    }
  };

  return (
    <StContainer>
      <StModal>
        <article>
          <div css={companyListStyle}>
            {COMPANYLIST.map((item) => (
              <CompanyItem
                key={item}
                name={item}
                onClick={() => handleSelect(item)}
              />
            ))}
          </div>
        </article>
        <div css={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <StCompanyInput
            type="text"
            placeholder="위 목록에 없다면 여기에 입력"
          />
          <RegisterBtn
            isActive={isActive}
            content="선택 완료"
            onClick={() => {}}
          />
        </div>
        <CustomCancelIcon onClick={onCancel} />
      </StModal>
    </StContainer>
  );
};

export default CompanyNameModal;

const StContainer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 4;
  background-color: rgb(0 0 0 / 50%);
`;

const StModal = styled.section`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 25rem;
  padding: 3rem 2rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 15px 15px 0 0;
`;

const companyListStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
`;

const StCompanyInput = styled(StBasicInput)`
  margin: 2.5rem 0;
`;

const CustomCancelIcon = styled(CancelIcon)`
  position: absolute;
  top: -3rem;
  right: 1.7rem;
`;
