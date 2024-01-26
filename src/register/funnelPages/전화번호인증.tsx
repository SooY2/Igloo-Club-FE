import RegisterBtn from '../components/RegisterBtn';
import RegisterHeader from '../components/RegisterHeader';
import * as St from '../styles/registerStyles';

const 전화번호인증 = () => {
  return (
    <>
      <RegisterHeader isFirst={true} percent={15} />
      <article css={St.articleStyles}>
        <section>
          <St.TitleBox>
            <St.Title>계정 생성을 시작하기 위해서는</St.Title>
            <St.Title>약관에 동의가 필요해요</St.Title>
          </St.TitleBox>
        </section>
        <RegisterBtn isActive={true} content="다음으로" onClick={() => {}} />
      </article>
    </>
  );
};

export default 전화번호인증;
