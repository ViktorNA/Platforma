import React, { useState, useEffect } from 'react';
import MoveBallsContainer from '../../containers/MoveBallsContainer.jsx';

const TIME_BEFORE_START = 3;

const TestScreen = ({ isTestStarted, setPosition, matrix }) => {
  const [timeBeforeStart, setTimeBeforeStart] = useState(TIME_BEFORE_START);
  const [timerId, setTimerId] = useState(0);
  const [isBallScreen, setIsBallScreen] = useState(false);

  const nextPosition = (i) => {
    setTimeout(() => {
      const { positionX, positionY } = matrix.actions[i];
      setPosition(positionX, positionY);
      if (i === matrix.times.length - 1) {
        setTimeout(() => {
          setIsBallScreen(false);
        }, 2000);
      } else nextPosition(i + 1);
    }, matrix.times[i]);
  };

  useEffect(() => {
    console.log(timeBeforeStart);
    if (timeBeforeStart === 0) {
      clearInterval(timerId);
      setIsBallScreen(true);
      nextPosition(0);
    }
  }, [timeBeforeStart]);

  useEffect(() => {
    console.log(isTestStarted);
    if (isTestStarted) {
      let time = TIME_BEFORE_START;
      setTimeBeforeStart(time);
      const tId = setInterval(() => {
        time -= 1;
        setTimeBeforeStart(time);
      }, 1000);
      clearInterval(timerId);
      setTimerId(tId);
    } else {
      setIsBallScreen(false);
      setTimeBeforeStart(TIME_BEFORE_START);
    }
  }, [isTestStarted]);

  if (isBallScreen && isTestStarted) {
    return <MoveBallsContainer />;
  } else {
    return isTestStarted ? (
      <div>{timeBeforeStart}</div>
    ) : (
      <div>Start test on device</div>
    );
  }
};

export default TestScreen;
