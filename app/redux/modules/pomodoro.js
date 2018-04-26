import { WORK, SHORT_BREAK, LONG_BREAK, TICK } from 'config'

const START_TIMER = 'START_TIMER'
const STOP_TIMER = 'STOP_TIMER'
const RESET_TIMER = 'RESET_TIMER'
const TIMER_TICK = 'TIMER_TICK'
const INCREMENT_ROUND = 'INCREMENT_ROUND'
const RESET_ROUND = 'RESET_ROUND'
const UPDATE_DURATION = 'UPDATE_DURATION'

let timer = null

export function startTimer () {
  return (dispatch, getState) => {
    if (!getState().pomodoro.running) {
      clearInterval(timer)
      timer = setInterval(() => dispatch(timerTick()), 1000)
      dispatch({ type: START_TIMER })
      dispatch(timerTick())
    }
  }
}

function timerTick (dispatch) {
  return (dispatch, getState) => {
    const pomodoro = getState().pomodoro
    if (pomodoro.timer <= 0) {
      dispatch(stopTimer())
      if (pomodoro.duration === WORK) {
        if (pomodoro.round === 4) {
          dispatch({ type: UPDATE_DURATION, duration: LONG_BREAK })
        } else {
          dispatch({ type: UPDATE_DURATION, duration: SHORT_BREAK })
        }
      } else {
        dispatch({ type: UPDATE_DURATION, duration: WORK })
        if (pomodoro.duration === SHORT_BREAK) {
          dispatch({ type: INCREMENT_ROUND })
        } else {
          dispatch({ type: RESET_ROUND })
        }
      }
    } else {
      dispatch({ type: TIMER_TICK })
    }
  }
}

export function stopTimer () {
  return (dispatch) => {
    clearInterval(timer)
    dispatch({ type: STOP_TIMER })
  }
}

export function resetTimer () {
  return (dispatch) => {
    clearInterval(timer)
    dispatch({ type: RESET_TIMER })
  }
}

export function resetPomodoro () {
  return (dispatch) => {
    clearInterval(timer)
    dispatch({ type: UPDATE_DURATION, duration: WORK })
    dispatch({ type: RESET_ROUND })
  }
}

const initialState = {
  running: false,
  round: 1,
  duration: WORK,
  timer: WORK
}

export default function pomodoro (state = initialState, action) {
  switch (action.type) {
    case START_TIMER:
      return {
        ...state,
        running: true
      }
    case STOP_TIMER:
      return {
        ...state,
        running: false
      }
    case TIMER_TICK:
      return {
        ...state,
        timer: state.timer - TICK
      }
    case RESET_TIMER:
      return {
        ...state,
        timer: state.duration,
        running: false
      }
    case UPDATE_DURATION:
      return {
        ...state,
        duration: action.duration,
        timer: action.duration
      }
    case INCREMENT_ROUND:
      return {
        ...state,
        round: state.round + 1
      }
    case RESET_ROUND:
      return {
        ...state,
        round: 1
      }
    default :
      return state
  }
}
