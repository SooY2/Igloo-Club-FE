import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import RegisterBtn from '../components/RegisterBtn';
import RegisterHeader from '../components/RegisterHeader';
import * as St from '../styles/registerStyles';
import { StBasicInput } from '../styles/registerInputStyles';
import { RegisterBasicInput } from '../components/RegisterInputs';
import styled from '@emotion/styled';
import { NavTypesProps } from '../types/navTypes';
import { ArrowRight } from '../assets/svgs/0_index';
import { css } from '@emotion/react';
import CompanyNameModal from '../components/CompanyNameModal';
import instance from '../../common/apis/axiosInstanse';

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

  useEffect(() => {
    if (company && email) setIsActive(true);
    else setIsActive(false);
  }, [company, email]);

  const handleSubmit = async () => {
    try {
      await instance.post('/api/company/email', {
        email: email,
      });
      setEmailInfo((prevEmailInfo) => ({
        ...prevEmailInfo,
        email: email,
        companyName: company,
      }));
    } catch (err) {
      console.log(err);
    }

    onNext();
  };

  return (
    <>
      <RegisterHeader percent={25} onPrev={onPrev} />
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
            <RegisterBasicInput label="회사명">
              <div css={companyNameStyles} onClick={() => setModal(true)}>
                <StBasicInput
                  type="text"
                  placeholder="재직 중이신 회사명을 선택해 주세요."
                  disabled
                  value={company}
                />
                <StCompanyName />
              </div>
            </RegisterBasicInput>
          </div>
        </section>
        <RegisterBtn
          isActive={isActive}
          content="다음으로"
          onClick={handleSubmit}
        />
      </article>
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

const companyNameStyles = css`
  position: relative;
  width: 100%;
`;

const StCompanyName = styled(ArrowRight)`
  position: absolute;
  top: 0;
  right: 0.7rem;
`;
