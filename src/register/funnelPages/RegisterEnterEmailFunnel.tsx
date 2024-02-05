import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import RegisterBtn from '../components/RegisterBtn';
import RegisterHeader from '../components/RegisterHeader';
import * as St from '../styles/registerStyles';
import { StBasicInput } from '../styles/registerInputStyles';
import {
  RegisterArrowInput,
  RegisterBasicInput,
} from '../components/RegisterInputs';
import styled from '@emotion/styled';
import { NavTypesProps } from '../types/navTypes';
import CompanyNameModal from '../components/CompanyNameModal';
import instance from '../../common/apis/axiosInstanse';
import axios from 'axios';

type SetEmailInfoType = Dispatch<
  SetStateAction<{
    email: string;
    companyName: string;
  }>
>;

export interface ExtendedNavTypesProps extends NavTypesProps {
  setEmailInfo: SetEmailInfoType;
}

const 회사이메일입력 = ({
  onPrev,
  onNext,
  setEmailInfo,
}: ExtendedNavTypesProps) => {
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState('');
  const [modal, setModal] = useState(false);
  const [company, setCompany] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (company && email) setIsActive(true);
    else setIsActive(false);
  }, [company, email]);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await instance.post('/api/company/email', {
        email: email,
      });
      setEmailInfo((prevEmailInfo) => ({
        ...prevEmailInfo,
        email: email,
        companyName: company,
      }));
      onNext();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.code === 'DUPLICATED_EMAIL')
          alert('이미 등록된 이메일입니다.');
        if (error.response?.data?.code === 'UNAVAILABLE_EMAIL')
          alert('사용불가능한 이메일입니다. 회사이메일을 이용해주세요');
      } else {
        console.log('An unexpected error occurred:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <RegisterHeader percent={25} onPrev={onPrev} />
      {isLoading ? (
        <>Loading,,</>
      ) : (
        <article css={St.articleStyles}>
          <section css={St.sectionStyles}>
            <TitleBox>
              <St.Title>눈길은 직장인 대상 서비스예요</St.Title>
              <St.Title>회사 이메일을 통해 인증을 시작할게요</St.Title>
            </TitleBox>
            <div
              css={{ display: 'flex', flexDirection: 'column', gap: '3.9rem' }}
            >
              <RegisterBasicInput
                label="회사 이메일 주소"
                explain="재직 중인 회사를 확인하는 절차이며, 다른 용도로 사용되지 않아요. "
              >
                <StBasicInput
                  type="text"
                  placeholder="회사 이메일 주소를 입력하세요."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </RegisterBasicInput>
              <RegisterArrowInput label="회사명" onClick={() => setModal(true)}>
                <StBasicInput
                  type="text"
                  placeholder="재직 중이신 회사명을 선택해 주세요."
                  disabled
                  value={company}
                />
              </RegisterArrowInput>
            </div>
          </section>
          <RegisterBtn
            isActive={isActive}
            content="다음으로"
            onClick={handleSubmit}
          />
        </article>
      )}
      {modal && (
        <CompanyNameModal
          email={email}
          onCancel={() => {
            setModal(false);
          }}
          onSelect={setCompany}
        />
      )}
    </>
  );
};

export default 회사이메일입력;

const TitleBox = styled(St.TitleBox)`
  margin-bottom: 5.4rem;
`;
