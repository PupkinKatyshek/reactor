import React from 'react';
import PropTypes from 'prop-types';
import './timer.css';

function Timer({ minutes, seconds, startTimer, stopTimer }) {
  return (
    <>
      <div className="timer-display">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="timer-controls">
        <button label="play" type="button" className="icon icon-play" onClick={startTimer} />
        <button label="pause" type="button" className="icon icon-pause" onClick={stopTimer} />
      </div>
    </>
  );
}

Timer.propTypes = {
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
};

export default Timer;
