import styled from '@emotion/styled';
import { css } from '@emotion/react';
import RegisterBtn from './RegisterBtn';
import { StBasicInput } from '../styles/registerInputStyles';
import { CancelIcon } from '../assets/svgs/0_index';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import RadioItem from './RadioItem';
import instance from '../../common/apis/axiosInstanse';

const CompanyNameModal = ({
  onCancel,
  onSelect,
  email,
}: {
  onCancel: () => void;
  onSelect: Dispatch<SetStateAction<string>>;
  email: string;
}) => {
  const [isActive, setIsActive] = useState(false);
  const [select, setSelect] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [isAdd, setIsAdd] = useState(false);
  const [companyNameList, setCompanyNameList] = useState<string[]>([]);

  useEffect(() => {
    getCompany();
  }, []);

  useEffect(() => {
    if (select || newCompany) {
      setIsActive(true);
      return;
    }
    if (select === '추가하기' && newCompany === '') {
      setIsActive(false);
      return;
    }
    setIsActive(false);
  }, [select, newCompany]);

  const handleSelect = (value: string): void => {
    if (value === '추가하기') {
      setIsAdd(true);
      setIsActive(false);
      return;
    }
    setSelect(value);
  };

  const handelNewCompany = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCompany(e.target.value);
  };

  const getCompany = async () => {
    try {
      const { data } = await instance.get(`/api/company?email=${email}`);
      setCompanyNameList(data.companyNameList);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StContainer>
      <StModal>
        <div css={companyListStyle}>
          {companyNameList.map((item) => (
            <RadioItem
              key={item}
              name="company"
              value={item}
              label={item}
              onRadioChange={handleSelect}
            />
          ))}
          <RadioItem
            name="company"
            value={'추가하기'}
            label="추가하기"
            onRadioChange={handleSelect}
          />
        </div>

        <div css={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <StCompanyInput
            type="text"
            placeholder="위 목록에 없다면 여기에 입력"
            value={newCompany}
            onChange={handelNewCompany}
            disabled={!isAdd}
          />
          <RegisterBtn
            isActive={isActive}
            content="선택 완료"
            onClick={() => {
              if (select) {
                onSelect(select);
              } else {
                onSelect(newCompany);
              }
              onCancel();
            }}
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
  width: 100%;
`;

const StCompanyInput = styled(StBasicInput)`
  margin: 2.5rem 0;
`;

const CustomCancelIcon = styled(CancelIcon)`
  position: absolute;
  top: -3rem;
  right: 1.7rem;
`;
