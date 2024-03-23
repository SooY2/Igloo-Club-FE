import { useState, useEffect } from 'react';

/*매칭 마감까지 남은 시간 계산하는 함수*/
export const calculateTimeLeft = () => {
  const now = new Date();
  const targetTime = new Date();

  targetTime.setHours(24, 0, 0, 0);

  const timeDifference = targetTime.getTime() - now.getTime();
  const totalSecondsLeft = Math.floor(timeDifference / 1000);

  const hours = Math.floor(totalSecondsLeft / 3600);
  const minutes = Math.floor((totalSecondsLeft % 3600) / 60);
  const seconds = totalSecondsLeft % 60;

  return {
    hours: formatTime(hours),
    minutes: formatTime(minutes),
    seconds: formatTime(seconds),
  };
};

const formatTime = (time: number) => {
  return time < 10 ? `0${time}` : `${time}`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CountDown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
    </div>
  );
};

export default CountDown;
