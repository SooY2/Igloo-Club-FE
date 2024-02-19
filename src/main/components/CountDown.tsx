import { useState, useEffect } from 'react';

/*매칭 마감까지 남은 시간 계산하는 함수*/
export const calculateTimeLeft = () => {
  const now = new Date();
  const targetTime = new Date();

  targetTime.setHours(12, 0, 0, 0);

  if (now.getHours() >= 12) {
    targetTime.setDate(targetTime.getDate() + 1);
  }

  targetTime.setHours(11, 0, 0, 0);

  const matchingTime = now.getHours() >= 12 || now.getHours() < 11;

  const timeDifference = targetTime.getTime() - now.getTime();
  const minutesLeft = Math.floor(timeDifference / (1000 * 60));

  return {
    minutes: minutesLeft % 60,
    hours: Math.floor(minutesLeft / 60),
    matchingTime,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CountDown = ({ onMatchingTime }: any) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = calculateTimeLeft().matchingTime;
      setTimeLeft(calculateTimeLeft());
      onMatchingTime(newTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [onMatchingTime, timeLeft.matchingTime]);

  return (
    <div>
      <p>
        {timeLeft.hours}시간 {timeLeft.minutes}분
      </p>
    </div>
  );
};

export default CountDown;
