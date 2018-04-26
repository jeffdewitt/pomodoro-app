import React from 'react'
import { Button } from 'components'
import { msToTime } from 'helpers/utils'
import { pomodoroContainer, controls, controlButton, warnButton, timerDetails, timerStyle, roundStyle } from './styles.css'
import { WORK, SHORT_BREAK, LONG_BREAK } from 'config'

import PropTypes from 'prop-types'

Pomodoro.propTypes = {
  timer: PropTypes.number.isRequired,
  round: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  resetPomodoro: PropTypes.func.isRequired
}

export default function Pomodoro ({timer, round, duration, startTimer, stopTimer, resetTimer, resetPomodoro}) {
  let activityMap = {}
  activityMap[WORK] = 'Work'
  activityMap[SHORT_BREAK] = 'Short Break'
  activityMap[LONG_BREAK] = 'Long Break'

  const handlePomodoroReset = () => {
    const confirm = window.confirm('Are you sure you wish to reset the Pomodoro?')
    if (confirm) resetPomodoro()
  }

  const activity = activityMap[duration]
  return (
    <section className={pomodoroContainer}>
      <h2>Pomodoro Timer</h2>
      <div className={timerDetails}>
        <span className={roundStyle}>{`Round ${round}: ${activity}!!`}</span>
        <span className={timerStyle}>{msToTime(timer)}</span>
      </div>
      <div className={controls}>
        <Button label="Start" action={startTimer} override={controlButton}/>
        <Button label="Stop" action={stopTimer} override={controlButton}/>
        <Button label="Reset" action={resetTimer} override={controlButton}/>
      </div>
      <div className={controls}>
        <Button label="Reset Pomodoro" action={handlePomodoroReset} override={warnButton}/>
      </div>
    </section>
  )
}
