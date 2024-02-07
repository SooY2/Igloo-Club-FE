export const calculateElapsedTime = (targetDateStr: string): string => {
  const targetDate = new Date(targetDateStr);
  const currentDate = new Date();

  const elapsedTime = currentDate.getTime() - targetDate.getTime();

  // 지난 시간이 없는 경우
  if (elapsedTime <= 0) {
    return '방금 전';
  }

  // 밀리초를 분, 시간, 일로 변환
  const minutes = Math.floor(elapsedTime / (1000 * 60));
  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  const days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));

  if (days > 0) {
    return `${days}일 전`;
  } else if (hours > 0) {
    return `${hours}시간 전`;
  } else {
    return `${minutes}분 전`;
  }
};
