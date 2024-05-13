// import { ChangeEvent, useEffect, useState } from 'react';
// import RegisterBtn from '../components/RegisterBtn';
// import RegisterHeader from '../components/RegisterHeader';
// import * as St from '../styles/registerStyles';
// import { StBasicBox } from '../styles/registerInputStyles';
// import {
//   RegisterArrowInput,
//   RegisterBasicInput,
// } from '../components/RegisterInputs';
// import styled from '@emotion/styled';
// import { ExtendedNavTypesProps } from '../types/navTypes';
// import { css } from '@emotion/react';
// import RadioItem from '../components/RadioItem';
// import {
//   ALCOHOL,
//   FACEDEPICTION,
//   HOBBY,
//   PERSONALITYDEPICTION,
//   SMOKE,
// } from '../constants/profileConstants';
// import { limitMaxLength } from '../../common/utils/limitMaxLength';
// import { Registertypes } from '../types/registerTypes';
// import instance from '../../common/apis/axiosInstanse';
// import FaceDepictionList from '../components/FaceDepictionList';
// import { findLabelByValue } from '../../common/utils/findLabelByValue';
// import PersonalityDepiction from '../components/PersonalityDepiction';
// import HobbyList from '../components/HobbyList';

// const MAXLEN = 1000;

// const 기본프로필입력2 = ({
//   onPrev,
//   onNext,
//   registerValues,
// }: ExtendedNavTypesProps) => {
//   const [isActive, setIsActive] = useState(false);
//   const [descriptionCnt, setDescriptionCnt] = useState(0);
//   const [values, setValues] = useState<Registertypes>(registerValues);
//   const [showFaceDepiction, setShowFaceDepction] = useState(false);
//   const [showPersonalityDepiction, setShowPersonalityDepiction] =
//     useState(false);
//   const [showHobby, setShowHobby] = useState(false);
//   useEffect(() => {
//     const {
//       alcohol,
//       smoke,
//       faceDepictionList,
//       personalityDepictionList,
//       description,
//     } = values;
//     if (
//       alcohol &&
//       smoke &&
//       faceDepictionList &&
//       personalityDepictionList &&
//       description
//     )
//       setIsActive(true);
//     else setIsActive(false);
//   }, [values]);

//   const handleValues = (value: string | string[], name?: string) => {
//     if (!name) return;
//     setValues((prevValues) => ({
//       ...prevValues,
//       [name]: value,
//     }));
//   };

//   const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
//     if (e.target.value === '') {
//       setDescriptionCnt(0);
//       handleValues('', 'description');
//     } //value가 없을 때 0으로 글자 수 세지도록 처리

//     const lengthCount = limitMaxLength(e, MAXLEN);

//     if (!lengthCount) return;
//     handleValues(e.target.value, 'description');
//     setDescriptionCnt(lengthCount);
//   };

//   //다음으로
//   const handleSubmit = async () => {
//     try {
//       await instance.post('/api/member', values);
//       onNext();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <>
//       <RegisterHeader percent={100} onPrev={onPrev} />
//       <article css={St.articleStyles}>
//         <section css={St.sectionStyles}>
//           <StTitleBox>
//             <St.Title>이제 정말 마지막이에요!</St.Title>
//             <St.Title>기본 프로필을 마저 채워주세요</St.Title>
//           </StTitleBox>
//           <div css={subTitleBoxStyles}>
//             <St.SubTitle>
//               기본 프로필은 상대방에게 보여지는 첫인상이에요.
//             </St.SubTitle>
//             <St.SubTitle>있는 그대로, 신중하게 입력해 주세요.</St.SubTitle>
//           </div>
//           <div
//             css={{ display: 'flex', flexDirection: 'column', gap: '3.9rem' }}
//           >
//             <RegisterBasicInput label="흡연량">
//               <div css={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
//                 {SMOKE.map((item) => (
//                   <RadioItem
//                     key={item.value}
//                     value={item.value}
//                     name="smoke"
//                     onRadioChange={handleValues}
//                     profile={true}
//                     label={item.label}
//                     checkedValue={values.smoke}
//                   />
//                 ))}
//               </div>
//             </RegisterBasicInput>
//             <RegisterBasicInput label="음주량">
//               <div css={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
//                 {ALCOHOL.map((item) => (
//                   <RadioItem
//                     key={item.value}
//                     value={item.value}
//                     name="alcohol"
//                     label={item.label}
//                     onRadioChange={handleValues}
//                     profile={true}
//                     checkedValue={values.alcohol}
//                   />
//                 ))}
//               </div>
//             </RegisterBasicInput>
//             <RegisterArrowInput
//               label="나의 외모 묘사"
//               onClick={() => setShowFaceDepction(true)}
//             >
//               <StBasicBox>
//                 {values.faceDepictionList.length === 0 ? (
//                   <StPlaceHolder>
//                     자신의 외모를 설명할 수 있는 키워드를 선택해 주세요.
//                   </StPlaceHolder>
//                 ) : (
//                   findLabelByValue(FACEDEPICTION, values.faceDepictionList)
//                 )}
//               </StBasicBox>
//             </RegisterArrowInput>
//             <RegisterArrowInput
//               label="나의 성격 묘사"
//               onClick={() => {
//                 setShowPersonalityDepiction(true);
//               }}
//             >
//               <StBasicBox>
//                 {values.personalityDepictionList.length === 0 ? (
//                   <StPlaceHolder>
//                     자신의 성격을 설명할 수 있는 키워드를 선택해 주세요.
//                   </StPlaceHolder>
//                 ) : (
//                   findLabelByValue(
//                     PERSONALITYDEPICTION,
//                     values.personalityDepictionList,
//                   )
//                 )}
//               </StBasicBox>
//             </RegisterArrowInput>
//             <RegisterArrowInput
//               label="나의 취미"
//               onClick={() => {
//                 setShowHobby(true);
//               }}
//             >
//               <StBasicBox>
//                 {values.hobbyList.length === 0 ? (
//                   <StPlaceHolder>평소 나의 취미를 선택해 주세요.</StPlaceHolder>
//                 ) : (
//                   findLabelByValue(HOBBY, values.hobbyList)
//                 )}
//               </StBasicBox>
//             </RegisterArrowInput>
//             <RegisterBasicInput label="소개글">
//               <div
//                 css={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   gap: '0.9rem',
//                 }}
//               >
//                 <details>
//                   <summary>가이드라인을 보려면 클릭하세요!</summary>
//                   <St.SubTitle
//                     css={{
//                       border: '1px solid rgb(250 114 104)',
//                       borderRadius: '20px',
//                       padding: '1rem',
//                       marginTop: '1rem',
//                       lineHeight: '1.8rem',
//                     }}
//                   >
//                     안녕하세요! 서비스를 개발하는 30대 중반 남성입니다! 현재
//                     광화문에서 근무 중이며 현재 하고 있는 개발 일을 좋아하고
//                     커리어를 쌓기 위해 노력 중입니다. 겨울에는 방어 먹으러 강릉
//                     겨울 바다로 달리는 것을 좋아하고, 여름에는 해 진 뒤의
//                     테라스에서 마시는 시원한 칵테일을 함께 즐길 수 있는 사람이면
//                     좋을 것 같아요. 가을에는 석파정의 붉게 물든 단풍잎으로
//                     가득찬 풍경을 나누고 싶고 그 외에도 함께 새로운 경험을 많이
//                     나누며 추억을 쌓아가고 싶습니다.
//                     <br /> 그런 만남을 오늘 커피 한잔으로 시작해보고 싶네요. 곧
//                     벚꽃도 피는데 함께 벚꽃 보면서 커피한잔 하실 분 편히 연락
//                     주시길 바래요😀
//                   </St.SubTitle>
//                 </details>
//                 <St.StBasicTextArea
//                   placeholder="회원님이 어떤 사람인지 자신만의 언어로 자유롭게 소개해주세요. 자세히 작성할 수록 매칭률이 높아져요! "
//                   value={values.description}
//                   onChange={handleDescription}
//                 />
//                 <St.StBasicTextCnt>
//                   {descriptionCnt}/{MAXLEN}
//                 </St.StBasicTextCnt>
//               </div>
//             </RegisterBasicInput>
//           </div>
//         </section>
//         <div
//           css={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             gap: '1.7rem',
//           }}
//         >
//           <St.StBtnExplain>
//             프로필 응답 내역은 언제든지 마이페이지에서 변경 가능해요
//           </St.StBtnExplain>
//           <RegisterBtn
//             isActive={isActive}
//             content="다음으로"
//             onClick={handleSubmit}
//           />
//         </div>
//       </article>
//       {showFaceDepiction && (
//         <FaceDepictionList
//           values={values.faceDepictionList}
//           handleValues={handleValues}
//           setShowFaceDepiction={setShowFaceDepction}
//         />
//       )}
//       {showPersonalityDepiction && (
//         <PersonalityDepiction
//           values={values.personalityDepictionList}
//           handleValues={handleValues}
//           setShowPersonalityDepiction={setShowPersonalityDepiction}
//         />
//       )}
//       {showHobby && (
//         <HobbyList
//           values={values.hobbyList}
//           handleValues={handleValues}
//           setShowHobby={setShowHobby}
//         />
//       )}
//     </>
//   );
// };

// export default 기본프로필입력2;

// const StTitleBox = styled(St.TitleBox)`
//   margin-bottom: 2.8rem;
// `;

// const subTitleBoxStyles = css`
//   display: flex;
//   flex-direction: column;
//   gap: 0.6rem;
//   margin-bottom: 5.3rem;
// `;

// const StPlaceHolder = styled.p`
//   color: ${({ theme }) => theme.colors.gray3};
// `;
