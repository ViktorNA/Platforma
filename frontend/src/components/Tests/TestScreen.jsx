import React, { useState, useEffect } from 'react';
import MoveBallsContainer from '../../containers/MoveBallsContainer.jsx';

const TestScreen = ({ isTestStarted, setPosition }) => {
  const [timeBeforeStart, setTimeBeforeStart] = useState(10);
  const [timerId, setTimerId] = useState(0);
  const [isBallScreen, setIsBallScreen] = useState(false);

  //TODO remove mock useEffect
  useEffect(() => {
    setInterval(() => {
      setPosition(Math.random() * 95 + 5, Math.random() * 95 + 5);
    }, 2000);
  }, []);

  useEffect(() => {
    if (timeBeforeStart === 0) {
      clearInterval(timerId);
      setIsBallScreen(true);
    }
  }, [timeBeforeStart]);

  useEffect(() => {
    let time = 3;
    setTimeBeforeStart(time);
    const tId = setInterval(() => {
      time -= 1;
      setTimeBeforeStart(time);
    }, 1000);
    clearInterval(timerId);
    setTimerId(tId);
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
