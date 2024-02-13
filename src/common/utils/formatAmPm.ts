/** Date 객체를 오후 00:00,오전 00:00 로 변환하는 함수입니다 */

export const formatAMPM = (dateStr: string): string => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  return date.toLocaleTimeString('ko-KR', options);
};
